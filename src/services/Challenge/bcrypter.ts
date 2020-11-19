import bcrypt from 'bcryptjs'
import crypto from 'crypto-js'

function hexToBytes({ hex }) {
	const bytes: number[] = []
	for (let c = 0; c < hex.length; c += 2) {
		bytes.push(parseInt(hex.substr(c, 2), 16))
	}
	return bytes
}

export function generateSaltFromUsername({ username }) {
	const usernameSha256 = crypto.SHA256(username)
	const generatedSalt = `$2a$12$${bcrypt.encodeBase64(
		hexToBytes({ hex: usernameSha256.toString() }),
		16
	)}`
	return generatedSalt
}

export function generateBcryptPassword({ salt, password }) {
	const passwordSha256 = crypto.SHA256(password)
	const base64Password = crypto.enc.Base64.stringify(passwordSha256)
	const bcryptPassword = bcrypt.hashSync(base64Password, salt)
	return bcryptPassword
}

export function generateChallenge({ salt, password }) {
	const bcryptPassword = bcrypt.hashSync(password, salt)
	return bcryptPassword
}
