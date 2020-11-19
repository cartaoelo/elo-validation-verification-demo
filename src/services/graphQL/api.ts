import { args } from '../../configs/api'

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
}): Promise<Response> => {
	const response = await fetch(args.graphQLurl, {
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
