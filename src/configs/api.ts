import { config } from 'dotenv'
import { encodeBase64 } from '../utils/base64'

config()

export const args = {
	client_id: '06ba261f-cdac-312b-a6e4-8ce46871484b',
	secret: '68b7fa71-64e6-38a0-809c-b76eafe8cdc0',
	graphQLurl: 'https://hml-api.elo.com.br/graphql',
	authorization: '',
	google_id: '243903624765-kegrdj4kkmcno9u13frb4qcbb76n43mp.apps.googleusercontent.com'
}
args.authorization = `Basic ${encodeBase64(`${args.client_id}:${args.secret}`)}`
