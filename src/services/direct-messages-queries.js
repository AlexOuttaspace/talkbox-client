import gql from 'graphql-tag'

export const directMessagesQuery = gql`
  query($teamId: Int!, $otherUserId: Int!) {
    directMessages(teamId: $teamId, otherUserId: $otherUserId) {
      id
      text
      created_at
      sender {
        id
        username
      }
    }
  }
`
