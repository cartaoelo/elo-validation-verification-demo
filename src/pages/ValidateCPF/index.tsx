import React, { useState } from 'react'
import FormButtonStyled from '../../components/Form/FormButton/FormButton.styled'
import FormInput from '../../components/Form/FormInput'
import ValidateCPFContainerStyled from '../../styles/CPF/ValidateCPF.styled'
import FormStyled from '../../styles/Home/LoginForm.styled'

const ValidateCPF = () => {
	const [stateCPF, setStateCPF] = useState({
		cpf: '',
		ended: false
	})

	const handleSubmit = e => {
		return
	}
	return (
		<ValidateCPFContainerStyled out={stateCPF.ended}>
			<h1>Faça Login no Portal Elo</h1>
			<FormStyled onSubmit={handleSubmit}>
				<FormInput
					boxIcons={{ name: 'envelope', type: 'solid' }}
					name="nome"
					value={stateCPF.cpf}
					onChange={e => setStateCPF({ ...stateCPF, cpf: e.target.value })}
				/>
				<FormButtonStyled type="submit">Enviar</FormButtonStyled>
			</FormStyled>
		</ValidateCPFContainerStyled>
	)
}

export default ValidateCPF
