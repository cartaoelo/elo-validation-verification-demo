import fetch from 'isomorphic-fetch'
import * as Bcrypter from './bcrypter'

import { args } from '../../configs/api'

export function generateBcryptPassword({ username, password }) {
	const usernameSalt = Bcrypter.generateSaltFromUsername({ username })
	return Bcrypter.generateBcryptPassword({ salt: usernameSalt, password })
}

export function createChallenge({ bcryptPassword, eloSalt }) {
	return Bcrypter.generateChallenge({ salt: eloSalt, password: bcryptPassword })
}

export const callAPI = async ({ client_id, variables, query }) => {
	const response = await fetch(args.graphQLurl, {
		method: 'POST',
		headers: {
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
