import gql from 'graphql-tag'

export const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!, $private: Boolean, $members: [Int!]) {
    createChannel(
      teamId: $teamId
      name: $name
      private: $private
      members: $members
    ) {
      ok
      errors {
        path
        message
      }
      channel {
        id
        name
      }
    }
  }
`
