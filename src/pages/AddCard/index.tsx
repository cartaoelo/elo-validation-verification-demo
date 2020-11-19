import iziToast from 'izitoast'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import AddCardStyled from '../../components/AddCard/AddCard.styled'
import FormButtonStyled from '../../components/Form/FormButton/FormButton.styled'
import FormInput from '../../components/Form/FormInput'
import FormMonthYearStyled from '../../components/Form/FormMonthYear/FormMonthYear.styled'
import FormStyled from '../../styles/Home/LoginForm.styled'

const AddCard = () => {
	const { handleSubmit, register } = useForm({
		criteriaMode: 'all',
		mode: 'onSubmit',
		shouldFocusError: true,
		reValidateMode: 'onSubmit'
	})
	const [stateCard, setStateCard] = useState({
		ended: false,
		buttonLoading: false,
		buttonText: ''
	})

	const onSubmit = handleSubmit(async values => {
		console.log(values)

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
