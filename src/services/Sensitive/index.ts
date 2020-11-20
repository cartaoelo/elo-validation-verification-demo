import { jwsSign, jweEncrypt } from './jwtEncryptions'
import key from './keypair.json'

export async function encryptCardData({ cardData, eloKey }) {
	const { pair } = key
	const cardSensitiveDataStringified = JSON.stringify(cardData)

	const serverKey = JSON.parse(eloKey)

	const signedJws = await jwsSign({ input: cardSensitiveDataStringified, key: pair })
	const sensitive = await jweEncrypt({ input: signedJws, key: serverKey })
	return { sensitive, key }
}
