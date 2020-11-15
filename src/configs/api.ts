import { config } from 'dotenv'
import { encodeBase64 } from '../utils/base64'

config()

console.log(process.env.CLIENT_ID)

export const args = {
	client_id: '06ba261f-cdac-312b-a6e4-8ce46871484b',
	secret: '68b7fa71-64e6-38a0-809c-b76eafe8cdc0',
	graphQLurl: 'https://hml-api.elo.com.br/graphql',
	authorization: ''
}
args.authorization = `Basic ${encodeBase64(`${args.client_id}:${args.secret}`)}`
