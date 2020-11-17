import iziToast from 'izitoast'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormButtonStyled from '../../components/Form/FormButton/FormButton.styled'
import FormInput from '../../components/Form/FormInput'
import Modal from '../../components/Modal'
import {
	ModalClose,
	ModalContainerClose,
	ModalContentStyled,
	ModalStyled
} from '../../components/Modal/Modal.styled'
import { args } from '../../configs/api'
import { callAPI } from '../../services/graphQL/api'
import { VERIFY_PROFILE_SCORE } from '../../services/graphQL/Mutations'
import AppContext from '../../store'
import ValidateCPFContainerStyled from '../../styles/CPF/ValidateCPF.styled'
import FormStyled from '../../styles/Home/LoginForm.styled'

const { client_id } = args

const ValidateCPF = () => {
	const { access_token } = useContext(AppContext)

	console.log(access_token)

	const { register, handleSubmit } = useForm()

	const [stateCPF, setStateCPF] = useState({
		ended: false,
		buttonText: 'Validar CPF',
		buttonLoading: false,
		modalText: '',
		modalShow: false
	})

	const onSubmit = handleSubmit(async values => {
		console.log(values)
		const formatedCPF = values.cpf.replace(/[.-]/g, '')

		setStateCPF({ ...stateCPF, buttonLoading: true, buttonText: 'Enviando...' })

		const profileCall = await callAPI({
			client_id,
			query: VERIFY_PROFILE_SCORE,
			variables: { cpf: formatedCPF },
			headers: { access_token }
		})

		if (profileCall.ok) {
			const profileResponse = await profileCall.json()

			console.log(profileResponse)

			const { score } = profileResponse.data.verifyProfileScore

			iziToast.info({
				title: 'Sucesso',
				message: `Seu score digital é de ${score.digitalBehaviourRisk} e seu risco no geral é de ${score.value}.`
			})

			return setStateCPF({
				...stateCPF,
				modalText: `Seu score digital é de ${score.digitalBehaviourRisk} e seu risco no geral é de ${score.value}.`,
				modalShow: true,
				buttonLoading: false,
				buttonText: 'Validar CPF'
			})
		} else {
			console.log('top', await profileCall.json())
		}
	})

	return (
		<ValidateCPFContainerStyled out={stateCPF.ended}>
			<h1>Agora precisamos validar seu CPF</h1>
			<h3>Não se preocupe! Todos os dados são confidenciais</h3>
			<FormStyled onSubmit={onSubmit}>
				<FormInput
					ref={register({ required: true, pattern: /\d{3}.?\d{3}.?\d{3}-\d{2}/ })}
					boxIcons={{ name: 'user', type: 'solid' }}
					name="cpf"
					mask="999.999.999-99"
				/>
				<FormButtonStyled disabled={stateCPF.buttonLoading}>
					{stateCPF.buttonText}
				</FormButtonStyled>
			</FormStyled>
			{/* <Modal show={stateCPF.modalShow} modalText={stateCPF.modalText} /> */}
			<ModalStyled show={stateCPF.modalShow}>
				<ModalContentStyled>
					<ModalContainerClose>
						<h2>Response</h2>
						<ModalClose>
							<box-icon name="x"></box-icon>
						</ModalClose>
					</ModalContainerClose>
					<p>{stateCPF.modalText}</p>
				</ModalContentStyled>
			</ModalStyled>
		</ValidateCPFContainerStyled>
	)
}

export default ValidateCPF
