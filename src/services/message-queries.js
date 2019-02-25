import gql from 'graphql-tag'

export const messagesQuery = gql`
  query($cursor: String, $channelId: Int!) {
    messages(cursor: $cursor, channelId: $channelId) {
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
