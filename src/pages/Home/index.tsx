import React, { useReducer, useState } from 'react'

import { args } from '../../configs/api'
import { callAPI } from '../../services/graphQL/api'

import { createChallenge, generateBcryptPassword } from '../../services/Challenge'
import errorHandler from '../../services/Error'
import { LOGIN, LOGIN_SALT, SOCIAL_LOGIN } from '../../services/graphQL/Mutations'

import { ContextActions, ContextTypes } from '../../types/context'

import FormStyled from '../../styles/Home/LoginForm.styled'
import HomeContainerStyled from '../../styles/Home/HomeContainer.styled'
import LoginContainerStyled from '../../styles/Home/LoginContainer.styled'
import LoginButtonStyled from '../../components/Login/LoginButton/LoginButton.styled'

import LoginInput from '../../components/Login/LoginInput'
import iziToast from 'izitoast'
import LoginSocialText from '../../components/Login/LoginSocial/LoginSocial.styled'

import GoogleLogin, { GoogleLoginResponse } from 'react-google-login'

const { client_id, authorization, google_id } = args

const Home = () => {
	const [stateLogin, setStateLogin] = useState({
		username: '',
		password: '',
		error: false,
		errorValue: '',
		errorFields: false,
		googleDisabled: false
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
			return iziToast.error({
				title: 'Erro',
				message: 'Veja se você preencheu todos os campos!'
			})
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

				iziToast.success({
					title: 'Sucesso',
					message: `Aqui está seu Access Token: ${accessToken}`
				})
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

	const handleSocialLogin = async response => {
		const {
			tokenId,
			profileObj
		}: Pick<GoogleLoginResponse, 'tokenId' | 'profileObj'> = response
		const socialCall = await callAPI({
			client_id,
			query: SOCIAL_LOGIN,
			variables: {
				provider: 'GOOGLE',
				username: profileObj.email,
				accessToken: tokenId
			},
			headers: {
				authorization
			}
		})
		// const socialResponse = await socialCall.json()
		if (!socialCall.ok) {
			const socialResponse = await socialCall.json()
			const { description } = JSON.parse(socialResponse.errors[0].message)[0]
			return iziToast.error({
				title: 'Erro',
				message: `Houve um erro na chamada da API ao Portal, descrição do erro: ${description}`
			})
		}

		const { data } = await socialCall.json()

		const {
			socialNetworkOAuthLogin: { accessToken }
		} = data

		console.log(data)

		dispatch({ type: 'CHANGE_ACCESSTOKEN', payload: accessToken })
		console.log('reducer', state.access_token)
		console.log('state', state.access_token)

		iziToast.success({
			title: 'Sucesso',
			message: `Aqui está seu Access Token: ${accessToken}`
		})
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
				<LoginSocialText>
					<span>Ou entre com</span>
				</LoginSocialText>
				<GoogleLogin
					clientId={google_id}
					cookiePolicy={'none'}
					buttonText="Google"
					onSuccess={handleSocialLogin}
					onFailure={e => {
						console.log(e)
						setStateLogin({ ...stateLogin, googleDisabled: true })
					}}
					disabled={stateLogin.googleDisabled}
				/>
			</LoginContainerStyled>
		</HomeContainerStyled>
	)
}

export default Home
