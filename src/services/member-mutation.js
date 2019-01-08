import gql from 'graphql-tag'

export const addMemberMutation = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamIf) {
      ok
      errors {
        path
        message
      }
    }
  }
`
