import React, { useReducer, useState } from 'react'

import { args } from '../../configs/api'
import { callAPI } from '../../services/graphQL/api'

import { createChallenge, generateBcryptPassword } from '../../services/Challenge'
import errorHandler from '../../services/Error/errorHandler'
import callApiErrorHandler from '../../services/Error/callApiErrorHandler'
import { LOGIN, LOGIN_SALT, SOCIAL_LOGIN } from '../../services/graphQL/Mutations'

import { ContextActions, ContextTypes } from '../../types/context'

import FormStyled from '../../styles/Home/LoginForm.styled'
import LoginContainerStyled from '../../styles/Home/LoginContainer.styled'
import FormButtonStyled from '../../components/Form/FormButton/FormButton.styled'

import FormInput from '../../components/Form/FormInput'
import iziToast from 'izitoast'
import LoginSocialText from '../../components/Login/LoginSocial/LoginSocial.styled'

import GoogleLogin, { GoogleLoginResponse } from 'react-google-login'
import { useHistory } from 'react-router-dom'

import { VALIDATECPF } from '../../constants/routes'
import { useForm } from 'react-hook-form'

import copy from 'copy-to-clipboard'
import { useAppContext } from '../../context/AppContext'

interface FormData {
	username: string
	password: string
}

const { client_id, authorization, google_id } = args

const Home = () => {
	const { register, handleSubmit } = useForm<FormData>()

	const history = useHistory()

	const { setAppContextState } = useAppContext()

	const [stateLogin, setStateLogin] = useState({
		error: false,
		errorValue: '',
		errorFields: false,
		googleDisabled: false,
		ended: false
	})

	const onSubmit = handleSubmit(async values => {
		const { username, password } = values
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
		const eloRes = await eloCall.json()

		callApiErrorHandler({
			call: eloCall,
			res: eloRes,
			state: stateLogin,
			setState: setStateLogin
		})

		const { salt: eloSalt } = eloRes.data.createLoginSalt

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
		const resLoginJSON = await loginCall.json()

		callApiErrorHandler({
			call: loginCall,
			res: resLoginJSON,
			state: stateLogin,
			setState: setStateLogin
		})

		if (resLoginJSON.data === null) {
			return iziToast.error({
				title: 'Erro',
				message: 'Usuário ou senha incorreto (a)!'
			})
		}

		const {
			data: {
				login: { accessToken }
			}
		} = resLoginJSON

		setStateLogin({
			...stateLogin,
			error: false
		})
		setAppContextState({ access_token: accessToken, cpf: '' })

		iziToast.success({
			title: 'Sucesso',
			message: `Aqui está seu Access Token: ${accessToken}`
		})

		history.push(VALIDATECPF)
	})

	const onSocialLogin = async response => {
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

		const resSocialJSON = await socialCall.json()

		const errorHandler = callApiErrorHandler({
			call: socialCall,
			res: resSocialJSON,
			state: stateLogin,
			setState: setStateLogin
		})

		if (!errorHandler) return errorHandler

		if (resSocialJSON !== null) {
			iziToast.error({
				title: 'Erro',
				message: 'Não há nenhum usuário associado a essa rede social!'
			})
			return iziToast.info({
				title: 'Token ID',
				message: `Para associar esse usuário à rede Google, copie seu token id`,
				buttons: [
					[
						'<button>Copiar</button>',
						(instance, toast) => {
							copy(tokenId, { debug: true })
							instance.hide(
								{
									transitionOut: 'fadeOutUp'
								},
								toast,
								'buttonName'
							)
						},
						true
					]
				]
			})
		}

		const {
			data: {
				socialNetworkOAuthLogin: { accessToken }
			}
		} = await resSocialJSON

		setAppContextState({ access_token: accessToken, cpf: '' })

		iziToast.success({
			title: 'Sucesso',
			message: `Aqui está seu Access Token: ${accessToken}`
		})

		setTimeout(() => {
			iziToast.info({
				title: 'Aviso',
				message: 'Estamos te redirecionando para a próxima tela',
				timeout: 3000
			})
		}, 2000)

		setTimeout(() => setStateLogin({ ...stateLogin, ended: true }), 4500)
		setTimeout(() => history.push(VALIDATECPF), 5000)
	}

	return (
		<LoginContainerStyled out={stateLogin.ended}>
			<h1>Faça Login no Portal Elo</h1>
			<FormStyled onSubmit={onSubmit}>
				<FormInput
					boxIcons={{ name: 'envelope', type: 'solid' }}
					name="username"
					ref={register}
				/>
				<FormInput
					boxIcons={{ name: 'lock', type: 'solid' }}
					name="password"
					type="password"
					ref={register}
				/>
				<FormButtonStyled type="submit">Enviar</FormButtonStyled>
			</FormStyled>
			<LoginSocialText>
				<span>Ou entre com</span>
			</LoginSocialText>
			<GoogleLogin
				clientId={google_id}
				cookiePolicy={'none'}
				buttonText="Google"
				onSuccess={onSocialLogin}
				onFailure={e => {
					setStateLogin({ ...stateLogin, googleDisabled: true })
				}}
				disabled={stateLogin.googleDisabled}
			/>
		</LoginContainerStyled>
	)
}

export default Home
