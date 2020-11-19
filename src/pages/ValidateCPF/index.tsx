import iziToast from 'izitoast'
import React, { useContext, useState } from 'react'
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
	const { access_token } = useContext(AppContext)

	console.log(access_token)

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
		const formatedCPF = values.cpf.replace(/[.-]/g, '')

		if (!formatedCPF) iziToast.error({ title: 'erro', message: 'CPF inválido' })

		setStateCPF({ ...stateCPF, buttonLoading: true, buttonText: 'Validando...' })

		const profileCall = await callAPI({
			client_id,
			query: VERIFY_PROFILE_SCORE,
			variables: { cpf: formatedCPF },
			headers: { access_token }
		})

		if (profileCall.ok) {
			const profileResponse = await profileCall.json()

			console.log(profileResponse)

			const { score }: { score: Score } = profileResponse.data.verifyProfileScore

			return setStateCPF({
				...stateCPF,
				modalText: JSON.stringify(score, null, 2),
				modalShow: true,
				buttonLoading: false,
				buttonText: 'Validar CPF'
			})
		} else {
			console.log('top', await profileCall.json())
		}
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
				<FormButtonStyled onClick={() => history.push(ADDCARD)}>
					Adicionar cartão
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
