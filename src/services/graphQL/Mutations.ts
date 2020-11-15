export const LOGIN_SALT = `
	mutation createLoginSalt($username: String!) {
		createLoginSalt(input: { username: $username }) {
			username
			salt
		}
	}
`

export const LOGIN = `
  mutation login($username: String!, $challenge: String!) {
  login(input: {username: $username, challenge: $challenge}) {
    accessToken
    oauthToken {
      accessToken
      refreshToken
    }
  }
}

`
