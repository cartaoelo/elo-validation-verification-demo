import React, { useContext, useReducer, useState } from 'react'
import iziToast from 'izitoast'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import FormButtonStyled from '../../components/Form/FormButton/FormButton.styled'
import FormInput from '../../components/Form/FormInput'
import Modal from '../../components/Modal'
import { args } from '../../configs/api'
import { ADDCARD } from '../../constants/routes'
import { callAPI } from '../../services/graphQL/api'
import { VERIFY_PROFILE_SCORE } from '../../services/graphQL/Mutations'
import AppContext from '../../store'
import ValidateCPFContainerStyled from '../../styles/CPF/ValidateCPF.styled'
import FormStyled from '../../styles/Home/LoginForm.styled'
import { Score } from '../../types/cpf'
import { ContextActions, ContextTypes } from '../../types/context'
import callApiErrorHandler from '../../services/Error/callApiErrorHandler'

const { client_id } = args

interface StateCPF {
	ended: boolean
	buttonText: 'Validar CPF' | 'Validando...'
	buttonLoading: boolean
	modalText: string
	modalShow: boolean
}

const ValidateCPF = () => {
	const history = useHistory()

	const { access_token, cpf } = useContext(AppContext)

	const [state, dispatch] = useReducer(
		(state: Pick<ContextTypes, 'cpf'>, { type, payload }: ContextActions) => {
			switch (type) {
				case 'CHANGE_CPF':
					return {
						...state,
						cpf: payload
					}

				default:
					return state
			}
		},
		{
			cpf: ''
		}
	)

	const { register, handleSubmit } = useForm({ mode: 'all' })

	const [stateCPF, setStateCPF] = useState<StateCPF>({
		ended: false,
		buttonText: 'Validar CPF',
		buttonLoading: false,
		modalText: '',
		modalShow: false
	})

	const onSubmit = async values => {
		console.log(values)
		const formatedCPF: string = values.cpf.replace(/[.-]/g, '')

		dispatch({
			type: 'CHANGE_CPF',
			payload: formatedCPF
		})

		if (!formatedCPF) iziToast.error({ title: 'erro', message: 'CPF inválido' })

		setStateCPF({ ...stateCPF, buttonLoading: true, buttonText: 'Validando...' })

		const profileCall = await callAPI({
			client_id,
			query: VERIFY_PROFILE_SCORE,
			variables: { cpf: formatedCPF },
			headers: { access_token }
		})

		const resProfileJSON = await profileCall.json()

		const errorHandler = callApiErrorHandler({
			call: profileCall,
			res: resProfileJSON,
			state: stateCPF,
			setState: setStateCPF
		})

		if (!errorHandler) return errorHandler

		if (resProfileJSON === null) {
			return iziToast.error({
				title: 'Erro',
				message: 'Não foi possível acessar o perfil!'
			})
		}

		const profileResponse = await profileCall.json()

		console.log('[profileResponse]', profileResponse)

		const { score }: { score: Score } = profileResponse.data.verifyProfileScore

		return setStateCPF({
			...stateCPF,
			modalText: JSON.stringify(score, null, 2),
			modalShow: true,
			buttonLoading: false,
			buttonText: 'Validar CPF'
		})
	}

	return (
		<ValidateCPFContainerStyled out={stateCPF.ended}>
			<h1>Agora precisamos validar seu CPF</h1>
			<h3>Não se preocupe! Todos os dados são confidenciais</h3>
			<FormStyled onSubmit={handleSubmit(onSubmit)}>
				<FormInput
					ref={register({ required: true, pattern: /\d{3}.?\d{3}.?\d{3}-\d{2}/ })}
					boxIcons={{ name: 'user', type: 'solid' }}
					name="cpf"
					mask="999.999.999-99"
				/>
				<FormButtonStyled disabled={stateCPF.buttonLoading} type="submit">
					{stateCPF.buttonText}
				</FormButtonStyled>
			</FormStyled>
			<Modal
				onClick={() => setStateCPF({ ...stateCPF, modalShow: false })}
				show={stateCPF.modalShow}
				modalText={stateCPF.modalText}
			/>
		</ValidateCPFContainerStyled>
	)
}

export default ValidateCPF
