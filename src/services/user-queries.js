import gql from 'graphql-tag'

export const meQuery = gql`
  query($teamId: Int!) {
    me {
      id
      username
      teams {
        id
        name
        admin
        directMessageMembers {
          id
          username
        }
        channels {
          id
          name
        }
      }
    }

    getTeamMembers(teamId: $teamId) {
      id
      username
    }
  }
`
