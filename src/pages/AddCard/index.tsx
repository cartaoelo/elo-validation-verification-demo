import iziToast from 'izitoast'
import React, { useContext, useState } from 'react'
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
import { callAPI } from '../../services/graphQL/api'
import { VERIFY_PAYMENT_ACCOUNT } from '../../services/graphQL/Mutations'
import { SERVER_KEYS } from '../../services/graphQL/Queries'
import { encryptCardData } from '../../services/Sensitive'
import AppContext from '../../store'
import FormStyled from '../../styles/Home/LoginForm.styled'

const { client_id } = args

const AddCard = () => {
	const { access_token, cpf } = useContext(AppContext)

	const { handleSubmit, register } = useForm({
		criteriaMode: 'all',
		mode: 'onSubmit',
		shouldFocusError: true,
		reValidateMode: 'onSubmit'
	})
	const [stateCard, setStateCard] = useState({
		ended: false,
		buttonLoading: false,
		buttonText: 'Adicionar',
		modalText: '',
		modalShow: false
	})

	const onSubmit = handleSubmit(async values => {
		return ''
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
