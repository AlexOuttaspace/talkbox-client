import gql from 'graphql-tag'

export const addMemberMutation = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      user {
        id
        username
      }
      errors {
        path
        message
      }
    }
  }
`
