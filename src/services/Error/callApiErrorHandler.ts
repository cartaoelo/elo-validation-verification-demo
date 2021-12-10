import iziToast from 'izitoast'
import errorHandler from './errorHandler'

interface ErrorHandler {
	call: Response
	res: any
	state: any
	setState: any
}

const callApiErrorHandler = async ({
	call,
	state,
	res,
	setState
}: ErrorHandler): Promise<boolean> => {
	if (!call) {
		const { status } = call
		const erro = errorHandler({ status })
		setState({
			...state,
			error: true,
			errorValue: erro
		})
		iziToast.error({
			title: 'Erro',
			message: `Houve um erro na chamada da API ao Portal, descrição do erro: ${erro.text}`
		})
		return false
	}

	if (res.data === null) {
		const errorJSON = JSON.parse(res.errors[0].message)
		const { code, description } = errorJSON[0] || errorJSON
		setState({
			...state,
			error: true,
			errorValue: description
		})
		iziToast.error({
			title: 'Erro',
			message: `Houve um erro na chamada da API ao Portal, com código: ${code} e descrição: ${description}`
		})
		return false
	}

	return true
}

export default callApiErrorHandler
