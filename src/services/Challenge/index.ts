import * as Bcrypter from './bcrypter'

export function generateBcryptPassword({ username, password }) {
	const usernameSalt = Bcrypter.generateSaltFromUsername({ username })
	return Bcrypter.generateBcryptPassword({ salt: usernameSalt, password })
}

export function createChallenge({ bcryptPassword, eloSalt }) {
	return Bcrypter.generateChallenge({ salt: eloSalt, password: bcryptPassword })
}
