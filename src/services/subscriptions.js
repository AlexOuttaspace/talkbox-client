import gql from 'graphql-tag'

export const newChannelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      user {
        id
        username
      }
      created_at
    }
  }
`
