import gql from 'graphql-tag'

export const defaultState = {
  authState: {
    __typename: 'authState',
    token: '',
    refreshToken: ''
  }
}

export const storeTokenMutation = gql`
  mutation($token: String, $refreshToken: String) {
    storeTokenMutation(token: $token, refreshToken: $refreshToken) @client
  }
`

export const getTokens = gql`
  query {
    authState @client {
      token
      refreshToken
    }
  }
`

export const localStateResolvers = {
  Mutation: {
    storeTokenMutation: (_, { token, refreshToken }, { cache }) => {
      console.log('INSIDE storeTokenMutation', { token, refreshToken })
      const data = {
        authState: {
          __typename: 'authState',
          token,
          refreshToken
        }
      }

      cache.writeData({ data })

      const queryResult = cache.readQuery({
        query: getTokens
      })

      console.log(queryResult)
      return null
    }
  }
}
