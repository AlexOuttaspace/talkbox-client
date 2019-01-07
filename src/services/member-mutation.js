import gql from 'graphql-tag'

export const addMemberMutation = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamIf: $teamIf) {
      ok
      errors {
        path
        message
      }
    }
  }
`
