import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import AddCardStyled from '../../components/AddCard/AddCard.styled'
import FormButtonStyled from '../../components/Form/FormButton/FormButton.styled'
import FormInput from '../../components/Form/FormInput'
import FormMonthYearStyled from '../../components/Form/FormMonthYear/FormMonthYear.styled'
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
			<h1>Adicionar cartão</h1>
			<FormStyled onSubmit={onSubmit}>
				<FormInput
					boxIcons={{ name: 'credit-card', type: 'solid' }}
					name="pan"
					required
					ref={register}
				/>
				<FormMonthYearStyled>
					<FormInput
						calendar
						boxIcons={{ name: 'calendar', type: 'solid' }}
						name="month"
						required
						ref={register}
					/>
					<FormInput
						calendar
						boxIcons={{ name: 'calendar-alt', type: 'solid' }}
						name="year"
						required
						ref={register}
					/>
				</FormMonthYearStyled>
				<FormInput
					required
					boxIcons={{ name: 'user', type: 'solid' }}
					name="name"
					ref={register}
				/>
				<FormButtonStyled type="submit" disabled={stateCard.ended}>
					Adicionar
				</FormButtonStyled>
			</FormStyled>
		</AddCardStyled>
	)
}

export default AddCard
