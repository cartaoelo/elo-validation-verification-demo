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

export const SOCIAL_LOGIN = `
  mutation socialNetworkOAuthLogin($provider: String!, $username: String!, $accessToken: String!) {
    socialNetworkOAuthLogin(input:{
      provider: $provider,
      username: $username,
      accessToken: $accessToken
    })
    {
      accessToken
    }
  }
`

export const VERIFY_PROFILE_SCORE = `
  query verifyProfileScore($cpf: String!){
    verifyProfileScore(cpf: $cpf){
        score {
           value
          spendingIndex
          digitalVarietyRisk
          digitalBehaviourRisk
          profileRisk
          statusRisk
          postalRisk
          rapportRisk
        }
    }
}
`

export const VERIFY_PAYMENT_ACCOUNT = `
  mutation ($cpf: String!, $sensitive: String!, $type: TransactionType!){
  verifyPaymentAccount(
    input:{
      legalIds: { #Campo opcional
        cpf: $cpf
      }
      sensitive: $sensitive
      type: $type
      acquirer: {
        id: "bc35eb85-6d31-4392-8af7-f97d20e325ec",
        code: "15",
        countryCode: "076"
      }
      merchant: {
        idCode: "e32a7918-eef5-41af-909b-f4c93cee2e16"
        name: "MERCHANT tx_name"
        legalName: "MERCHANT tx_legal_name"
        legalIds:{
          cnpj: "13941300000117"
        }
        contact:{
          type: PHONE
          context: "Trabalho"
          value: "+5511999991111"
        }
        address:{
          country: "076"
          city: "São Paulo"
          state: "São Paulo"
          zip: "123456788"
          number: 1234
          place: "Paulista"
        }
        iso: 1111
        countryCode: "076"
      }
    }
  )
  {
    verifyPaymentAccount{
        status
      verifiedAt
    }
  }
}
`
