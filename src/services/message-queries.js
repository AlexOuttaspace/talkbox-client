import gql from 'graphql-tag'

export const messagesQuery = gql`
  query($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      text
      created_at
      url
      filetype
      user {
        id
        username
      }
    }
  }
`
