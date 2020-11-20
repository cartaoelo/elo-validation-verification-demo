export interface ContextTypes {
	access_token: string
	sensitive: string
	cpf: string
}

export type ContextActions = {
	type: 'CHANGE_ACCESSTOKEN' | 'CHANGE_SENSITIVE' | 'CHANGE_CPF'
	payload: unknown
}
