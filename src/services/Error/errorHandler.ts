interface ErrorProps {
	status: number | string
}

const errorHandler = ({ status }: ErrorProps) => {
	let erro
	switch (status) {
		case 401:
			erro = {
				text: 'client_id incorreto.',
				json: {
					error:
						'Could not find a required APP in the request, identified by HEADER client_id.'
				}
			}
			return erro
		case 403:
			erro = {
				text: 'Você não tem autorização para acessar essa API.',
				json: {
					error: 'The APP can not access this API'
				}
			}
			return erro
		case 504:
			erro = {
				text: 'Erro no servidor da Elo, contate o suporte!',
				json: {
					error: 'Gateway Time-out'
				}
			}
			return erro
		case 'keyPair':
			erro = {
				text: 'Erro na criação da keyPair, contate o suporte!',
				json: {
					error: 'Unknown Error'
				}
			}
			return erro
		case 'encrypt':
			erro = {
				text: 'Não foi possível criptografar o cartão! Analise seus dados!',
				json: {
					error: 'Encrypt Failed'
				}
			}
			return erro
		case 'locked':
			erro = {
				text: 'Não foi possível fazer login! Consulte a administração!',
				json: {
					error: 'Unknown Error'
				}
			}
			return erro
		default:
			erro = {
				text: 'Erro desconhecido, contate o suporte!',
				json: {
					error: 'Unknown Error'
				}
			}
			return erro
	}
}

export default errorHandler
