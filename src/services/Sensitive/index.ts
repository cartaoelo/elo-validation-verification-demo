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

	if (!jwk) console.log(jwk)

	const signedJws = await jwsSign({ input: cardSensitiveDataStringified, key: jwk })
	const sensitive = await jweEncrypt({ input: signedJws, key: serverKey })
	return { sensitive, key }
}
