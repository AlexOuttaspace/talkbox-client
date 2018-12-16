import gql from 'graphql-tag'

export const defaultState = {
  authState: {
    __typename: 'authState',
    token: null,
    refreshToken: null
  }
}

export const storeTokenMutation = gql`
  mutation($token: String, $refreshToken: String) {
    storeTokenMutation(token: $token, refreshToken: $refreshToken) @client
  }
`

export const getToken = gql`
  query @client {
    token
    refreshToken
  }
`

export const localStateResolvers = {
  Mutation: {
    storeTokenMutation: (_, args, { cache }) => {
      const { token, refreshToken } = args
      console.log(args)
      console.log('inside storetokenmutaion resolver!', token, refreshToken)
      const data = {
        authState: {
          __typename: 'authState',
          token,
          refreshToken
        }
      }

      cache.writeData({ data })
      return null
    }
  }
}
