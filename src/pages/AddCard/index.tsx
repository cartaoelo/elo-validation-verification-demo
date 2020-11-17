import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import AddCardStyled from '../../components/AddCard/AddCard.styled'
import FormButtonStyled from '../../components/Form/FormButton/FormButton.styled'
import FormInput from '../../components/Form/FormInput'
import FormStyled from '../../styles/Home/LoginForm.styled'

const AddCard = () => {
	const { handleSubmit, register } = useForm()
	const [stateCard, setStateCard] = useState({
		ended: false
	})

	const onSubmit = handleSubmit(async values => {
		return ''
	})

	return (
		<AddCardStyled>
			<h1>Faça Login no Portal Elo</h1>
			<FormStyled onSubmit={onSubmit}>
				<FormInput
					boxIcons={{ name: 'envelope', type: 'solid' }}
					name="pan"
					required
					ref={register}
				/>
				<div className="">
					<FormInput
						calendar
						boxIcons={{ name: 'envelope', type: 'solid' }}
						name="month"
						required
						ref={register}
					/>
					<FormInput
						calendar
						boxIcons={{ name: '', type: 'solid' }}
						name="year"
						required
						ref={register}
					/>
				</div>
				<FormInput
					required
					boxIcons={{ name: 'user', type: 'solid' }}
					name="name"
					ref={register}
				/>
				<FormButtonStyled type="submit" disabled={stateCard.ended}>
					Enviar
				</FormButtonStyled>
			</FormStyled>
		</AddCardStyled>
	)
}

export default AddCard
