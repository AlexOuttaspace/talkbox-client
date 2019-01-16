import gql from 'graphql-tag'

export const newChannelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      created_at
      user {
        id
        username
      }
    }
  }
`

export const newDirectMessageSubscription = gql`
  subscription($teamId: Int!, $userId: Int!) {
    newDirectMessage(teamId: $teamId, userId: $userId) {
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
