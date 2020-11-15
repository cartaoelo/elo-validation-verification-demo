import jose from 'node-jose'

import { jwsSign, jweEncrypt } from './jwtEncryptions'

async function generateKeyPair({ kid }) {
	const jwk = await jose.JWK.createKey('EC', 'P-256', { kid })
	const key = {
		pair: jwk.toJSON(true),
		public: jwk.toJSON(false)
	}
	return { jwk, key }
}

export async function encryptCardData({ cardData, eloKey, kid }) {
	const { jwk, key } = await generateKeyPair(kid)
	const cardSensitiveDataStringified = JSON.stringify(cardData)

	const serverKey = JSON.parse(eloKey)
	serverKey.kid = kid

	if (jwk) {
		const signedJws = await jwsSign({ input: cardSensitiveDataStringified, key: jwk })
		const sensitive = await jweEncrypt({ input: signedJws, key: serverKey })
		return { sensitive, key }
	}
}

export const callAPI = async ({
	client_id,
	variables,
	query,
	headers
}: {
	client_id: string
	variables: Record<string, unknown>
	query: string
	headers?: Record<string, unknown>
}) => {
	const response = await fetch('https://hml-api.elo.com.br/graphql', {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json',
			client_id
		},
		body: JSON.stringify({
			query,
			variables
		})
	})
	return response
}
