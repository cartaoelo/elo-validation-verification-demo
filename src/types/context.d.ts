export interface ContextTypes {
	access_token: string
	sensitive: string
}

export type ContextActions = {
	type: 'CHANGE_ACCESSTOKEN' | ''
	payload: unknown
}
