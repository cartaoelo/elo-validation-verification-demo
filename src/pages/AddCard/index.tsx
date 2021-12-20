import iziToast from 'izitoast'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import AddCardStyled from '../../components/AddCard/AddCard.styled'
import FormButtonStyled from '../../components/Form/FormButton/FormButton.styled'
import FormInput from '../../components/Form/FormInput'
import FormMonthYearStyled from '../../components/Form/FormMonthYear/FormMonthYear.styled'
import RadioButton from '../../components/RadioButton'
import {
	RadioContainerStyled,
	RadioDivStyled
} from '../../components/RadioButton/RadioButton.styled'
import { args } from '../../configs/api'
import { useAppContext } from '../../context/AppContext'
import callApiErrorHandler from '../../services/Error/callApiErrorHandler'
import { callAPI } from '../../services/graphQL/api'
import { VERIFY_PAYMENT_ACCOUNT } from '../../services/graphQL/Mutations'
import { SERVER_KEYS } from '../../services/graphQL/Queries'
import { encryptCardData } from '../../services/Sensitive'
import FormStyled from '../../styles/Home/LoginForm.styled'

const { client_id } = args

const AddCard = () => {
	const {
		appContextState: { access_token, cpf }
	} = useAppContext()

	const { handleSubmit, register } = useForm({
		criteriaMode: 'all',
		mode: 'onSubmit',
		shouldFocusError: true,
		reValidateMode: 'onSubmit'
	})
	const [stateCard, setStateCard] = useState({
		ended: false,
		buttonLoading: false,
		buttonText: 'Adicionar'
	})

	const onSubmit = handleSubmit(async values => {
		const data = {
			pan: values.pan.trim().replace(' ', ''),
			expiry: {
				month: values.mês,
				year: values.year
			},
			name: values.name,
			csv: values.csv.trim().replace(' ', '')
		}

		setStateCard({ ...stateCard, buttonLoading: true, buttonText: 'Validando...' })

		const keysCall = await callAPI({
			client_id,
			query: SERVER_KEYS,
			headers: { access_token }
		})

		const resKeysJSON = await keysCall.json()

		const errorHandler = callApiErrorHandler({
			call: keysCall,
			res: resKeysJSON,
			state: stateCard,
			setState: setStateCard
		})

		if (!errorHandler) {
			setStateCard({
				...stateCard,
				buttonLoading: false,
				buttonText: 'Validar'
			})

			return errorHandler
		}

		if (!keysCall) {
			setStateCard({
				...stateCard,
				buttonLoading: false,
				buttonText: 'Validar'
			})

			return iziToast.error({
				title: 'Erro',
				message: 'Não foi possível acessar a chamada!'
			})
		}

		const {
			data: {
				serverPublicKey: { key }
			}
		} = resKeysJSON

		const { sensitive } = await encryptCardData({
			eloKey: key,
			cardData: JSON.stringify(data)
		})

		if (!sensitive) console.log('[sensitive erro]', sensitive)

		const verifyCall = await callAPI({
			client_id,
			query: VERIFY_PAYMENT_ACCOUNT,
			headers: {
				access_token,
				client_id
			},
			variables: {
				cpf,
				sensitive,
				type: values.type
			}
		})

		const resVerifyJSON = await verifyCall.json()

		const errorVerifyHandler = callApiErrorHandler({
			call: verifyCall,
			res: resVerifyJSON,
			state: stateCard,
			setState: setStateCard
		})

		if (!errorVerifyHandler) return errorVerifyHandler

		if (!resVerifyJSON.data || !resVerifyJSON.data.verifyPaymentAccount) {
			setStateCard({
				...stateCard,
				buttonLoading: false,
				buttonText: 'Validar Cartão'
			})

			return iziToast.error({
				title: 'Erro',
				message: resVerifyJSON.errors[0].message
			})
		}

		const { status } = resVerifyJSON.data.verifyPaymentAccount

		setStateCard({
			...stateCard,
			buttonLoading: false,
			buttonText: 'Validar Cartão'
		})

		return iziToast.success({
			title: 'Sucesso',
			message: `O status desse cartão é: ${status}`
		})
	})

	return (
		<AddCardStyled>
			<h1>Adicionar cartão</h1>
			<FormStyled onSubmit={onSubmit}>
				<FormInput
					boxIcons={{ name: 'credit-card', type: 'solid' }}
					name="pan"
					required
					mask="9999 9999 9999 9999"
					ref={register({ required: true })}
				/>
				<FormMonthYearStyled>
					<FormInput
						boxIcons={{ name: 'calendar', type: 'solid' }}
						name="mês"
						required
						maxLength={2}
						minLength={2}
						min={1}
						max={12}
						ref={register({
							required: true,
							maxLength: 2,
							minLength: 2,
							min: 1,
							max: 12
						})}
					/>
					<FormInput
						boxIcons={{ name: 'calendar-alt', type: 'solid' }}
						name="ano"
						required
						min={new Date().getUTCFullYear()}
						max={new Date().getUTCFullYear() + 10}
						maxLength={4}
						minLength={4}
						ref={register({
							required: true,
							maxLength: 4,
							minLength: 4,
							min: new Date().getUTCFullYear(),
							max: new Date().getUTCFullYear() + 10
						})}
					/>
				</FormMonthYearStyled>
				<FormInput
					required
					boxIcons={{ name: 'user', type: 'solid' }}
					name="name"
					ref={register({ required: true })}
				/>
				<FormInput
					required
					type="password"
					boxIcons={{ name: 'credit-card-front', type: 'solid' }}
					maxLength={3}
					name="csv"
					ref={register({ required: true, maxLength: 3 })}
				/>
				<RadioContainerStyled>
					<h3>Tipo de cartão:</h3>
					<RadioDivStyled>
						<RadioButton
							option="Crédito"
							optionValue="CREDIT"
							defaultChecked={true}
							ref={register({ required: true })}
							name="type"
						/>
						<RadioButton
							option="Débito"
							optionValue="DEBIT"
							ref={register({ required: true })}
							name="type"
						/>
					</RadioDivStyled>
				</RadioContainerStyled>
				<FormButtonStyled type="submit" disabled={stateCard.ended}>
					{stateCard.buttonText}
				</FormButtonStyled>
			</FormStyled>
		</AddCardStyled>
	)
}

export default AddCard
