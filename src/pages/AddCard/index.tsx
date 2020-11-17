import React, { ChangeEvent, useState } from 'react'
import AddCardStyled from '../../components/AddCard/AddCard.styled'
import FormButtonStyled from '../../components/Form/FormButton/FormButton.styled'
import FormInput from '../../components/Form/FormInput'
import FormStyled from '../../styles/Home/LoginForm.styled'

interface Card {
	pan: string
	csc: string
	name: string
	expiry: {
		year: string
		month: string
	}
}

interface StateCard {
	card: Card
	ended: boolean
}

const AddCard = () => {
	const [stateCard, setStateCard] = useState<StateCard>({
		card: {
			pan: '',
			csc: '',
			name: '',
			expiry: {
				year: '',
				month: ''
			}
		},
		ended: false
	})

	const handleChange = (key: keyof Card) => (e: ChangeEvent<HTMLInputElement>) => {
		setStateCard({
			...stateCard,
			card: {
				...stateCard.card,
				[key]: e.target.value
			}
		})
	}

	const handleSubmit = e => {
		return
	}

	return (
		<AddCardStyled>
			<h1>Faça Login no Portal Elo</h1>
			<FormStyled onSubmit={handleSubmit}>
				<FormInput
					boxIcons={{ name: 'envelope', type: 'solid' }}
					name="nome"
					value={stateCard.card.name}
					onChange={handleChange('name')}
				/>
				<FormButtonStyled type="submit">Enviar</FormButtonStyled>
			</FormStyled>
		</AddCardStyled>
	)
}

export default AddCard
