import gql from 'graphql-tag'

export const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
        name
        channels {
          id
        }
      }
      errors {
        path
        message
      }
    }
  }
`
