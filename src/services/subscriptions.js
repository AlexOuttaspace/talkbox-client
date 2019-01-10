import gql from 'graphql-tag'

export const newChannelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      created_at
    }
  }
`
