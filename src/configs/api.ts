import { config } from 'dotenv'
import { encodeBase64 } from '../utils/base64'

config()

export const args = {
	// Client_id da sua aplicação fornecido no Portal Elo
	client_id: '',
	// Secret da sua aplicação fornecido no Portal Elo
	secret: '',
	// Base Url da aplicação ELO, retire o hml- para rodar em ambiente de produção
	graphQLurl: 'https://hml-api.elo.com.br/graphql',
	// Authorização em Basic, não é necessário preencher, visto que a aplicação irá fazer o encode com o Client_id e Secret fornecidos
	authorization: '',
	// ID Google OAuth vindo do seu app vindos do app na plataforma do Google Cloud
	google_id: ''
}

args.authorization = `Basic ${encodeBase64(`${args.client_id}:${args.secret}`)}`
