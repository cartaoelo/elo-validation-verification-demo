import { Base64 } from 'js-base64'

export function encodeBase64(value: string): string {
	return Base64.encode(value)
}

export function decodeBase64(b64: string): string {
	return Base64.decode(b64)
}
