import React, { useReducer, useState } from 'react'
import { args } from '../../configs/api'
import { createChallenge, generateBcryptPassword } from '../../services/Challenge'
import errorHandler from '../../services/Error'
import { LOGIN, LOGIN_SALT } from '../../services/graphQL/Mutations'
import { callAPI } from '../../services/Sensitive'
import { ContextActions, ContextTypes } from '../../types/context'

const { client_id, authorization } = args

const Home = () => {
	const [stateLogin, setStateLogin] = useState({
		username: '',
		password: '',
		error: false,
		errorValue: ''
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
		const { username, password } = stateLogin
		e.preventDefault()

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
		<>
			<form noValidate onSubmit={handleSubmit}>
				<input
					type="text"
					value={stateLogin.username}
					placeholder="username"
					onChange={e => setStateLogin({ ...stateLogin, username: e.target.value })}
				/>
				<br />
				<input
					type="text"
					value={stateLogin.password}
					placeholder="password"
					onChange={e => setStateLogin({ ...stateLogin, password: e.target.value })}
				/>
				<br />
				<br />
				<button type="submit">Enviar</button>
			</form>
		</>
	)
}

export default Home
