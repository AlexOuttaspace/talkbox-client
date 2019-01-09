import gql from 'graphql-tag'

export const messagesQuery = gql`
  query($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      text
      created_at
      user {
        username
      }
    }
  }
`
