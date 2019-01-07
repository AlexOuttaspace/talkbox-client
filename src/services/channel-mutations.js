import gql from 'graphql-tag'

export const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
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
