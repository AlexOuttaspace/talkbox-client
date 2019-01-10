import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { compose } from 'ramda'
import { Query } from 'react-apollo'

import { MessagesList } from './messages-list'

import { messagesQuery, newChannelMessageSubscription } from 'src/services'

export const MessagesView = ({ router }) => {
  const channelId = +router.query.messagesId

  return (
    <Query query={messagesQuery} variables={{ channelId }}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return <div>loading</div>

        if (error) {
          console.log(error)
          return <div>error</div>
        }

        if (!data) return null

        return (
          <MessagesList
            subscribeToNewMessages={() =>
              subscribeToMore({
                document: newChannelMessageSubscription,
                variables: { channelId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData) return prev

                  const temp = {
                    ...prev,
                    messages: [
                      ...prev.messages,
                      subscriptionData.data.newChannelMessage
                    ]
                  }

                  console.log(
                    temp,
                    subscriptionData.newChannelMessage,
                    subscriptionData
                  )

                  return temp
                },
                onError: (error) => console.log(error)
              })
            }
            messages={data.messages || []}
          />
        )
      }}
    </Query>
  )
}

MessagesView.propTypes = {
  router: PropTypes.object.isRequired
}

const enhance = compose(withRouter)

export const Messages = enhance(MessagesView)
