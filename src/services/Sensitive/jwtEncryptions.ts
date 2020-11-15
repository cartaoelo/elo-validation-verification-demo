import jose from 'node-jose'

export function jweEncrypt({ input, key }) {
	return jose.JWE.createEncrypt({ format: 'compact' }, key).update(input).final()
}

export function jwsSign({ input, key }) {
	return jose.JWS.createSign({ format: 'compact', alg: 'ES256' }, key).update(input).final()
}
