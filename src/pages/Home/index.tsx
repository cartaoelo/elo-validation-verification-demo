import React, { useReducer, useState } from 'react'
import { args } from '../../configs/api'
import { createChallenge, generateBcryptPassword } from '../../services/Challenge'
import errorHandler from '../../services/Error'
import { LOGIN, LOGIN_SALT } from '../../services/graphQL/Mutations'
import { callAPI } from '../../services/graphQL/api'
import { ContextActions, ContextTypes } from '../../types/context'
import FormStyled from '../../styles/Home/LoginForm.styled'
import HomeContainerStyled from '../../styles/Home/HomeContainer.styled'
import LoginContainerStyled from '../../styles/Home/LoginContainer.styled'
import LoginInput from '../../components/Login/LoginInput'
import { LoginButtonStyled } from '../../components/Login/LoginButton/LoginButton.styled'

const { client_id, authorization } = args

const Home = () => {
	const [stateLogin, setStateLogin] = useState({
		username: '',
		password: '',
		error: false,
		errorValue: '',
		errorFields: false
	})

	const [state, dispatch] = useReducer(
		(state: Pick<ContextTypes, 'access_token'>, { type, payload }: ContextActions) => {
			switch (type) {
				case 'CHANGE_ACCESSTOKEN':
					return {
						...state,
						access_token: payload
					}

				default:
					return state
			}
		},
		{
			access_token: ''
		}
	)

	const handleSubmit = async e => {
		e.preventDefault()

		const { username, password } = stateLogin

		if (username === '' || password === '') {
			setStateLogin({ ...stateLogin, errorFields: true })
		}

		const eloCall = await callAPI({
			query: LOGIN_SALT,
			variables: { username },
			client_id
		})

		if (eloCall.ok) {
			const { data: saltData } = await eloCall.json()
			const { salt: eloSalt } = saltData.createLoginSalt

			const bcryptPassword = generateBcryptPassword({
				username,
				password
			})

			const challenge = createChallenge({ eloSalt, bcryptPassword })

			const loginCall = await callAPI({
				client_id,
				query: LOGIN,
				variables: {
					username,
					challenge
				},
				headers: {
					authorization
				}
			})

			if (loginCall.ok) {
				const { data: loginData } = await loginCall.json()
				const {
					login: { accessToken }
				} = loginData

				dispatch({ type: 'CHANGE_ACCESSTOKEN', payload: accessToken })
				console.log('reducer', state.access_token)
				console.log('state', state.access_token)
			} else console.log(loginCall)

			setStateLogin({
				...stateLogin,
				error: false
			})
		} else {
			const { status } = eloCall
			const erro = errorHandler({ status })
			setStateLogin({
				...stateLogin,
				error: true,
				errorValue: erro
			})
		}
	}

	return (
		<HomeContainerStyled>
			<LoginContainerStyled>
				<h1>Faça Login no Portal Elo</h1>
				<FormStyled onSubmit={handleSubmit}>
					<LoginInput
						boxIcons={{ name: 'envelope', type: 'solid' }}
						name="username"
						value={stateLogin.username}
						onChange={e => setStateLogin({ ...stateLogin, username: e.target.value })}
					/>
					<LoginInput
						boxIcons={{ name: 'lock', type: 'solid' }}
						name="password"
						type="password"
						value={stateLogin.password}
						onChange={e => setStateLogin({ ...stateLogin, password: e.target.value })}
					/>
					<LoginButtonStyled type="submit">Enviar</LoginButtonStyled>
				</FormStyled>
			</LoginContainerStyled>
		</HomeContainerStyled>
	)
}

export default Home