import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { compose } from 'ramda'
import { Query } from 'react-apollo'

import { MessagesList } from './messages-list'

import { messagesQuery, newChannelMessageSubscription } from 'src/services'

const ChannelMessagesView = ({ router }) => {
  const [hasMoreMessages, setHasMoreMessages] = useState(true)
  const channelId = +router.query.messagesId
  // only refetch on client
  const fetchPolicy = process.browser ? 'cache-and-network' : 'cache-first'

  return (
    <Query
      query={messagesQuery}
      variables={{ channelId }}
      fetchPolicy={fetchPolicy}
    >
      {({ error, data, subscribeToMore, fetchMore }) => {
        if (error) {
          console.log(error)
          return <div>error</div>
        }

        if (!data) return null

        const fetchMoreMessages = hasMoreMessages
          ? () =>
              fetchMore({
                variables: {
                  channelId,
                  cursor: data.messages[data.messages.length - 1].created_at
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return previousResult

                  // 20 is the number of messages per request
                  // if (fetchMoreResult.messages.length < 20)
                  //   setHasMoreMessages(false)

                  return {
                    ...previousResult,
                    messages: [
                      ...previousResult.messages,
                      ...fetchMoreResult.messages
                    ]
                  }
                }
              })
          : () => {}

        console.log(data.messages.length)

        return (
          <MessagesList
            fetchMoreMessages={fetchMoreMessages}
            subscribeToNewMessages={() =>
              subscribeToMore({
                document: newChannelMessageSubscription,
                variables: { channelId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData) return prev

                  return {
                    ...prev,
                    messages: [
                      subscriptionData.data.newChannelMessage,
                      ...prev.messages
                    ]
                  }
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

ChannelMessagesView.propTypes = {
  router: PropTypes.object.isRequired
}

const enhance = compose(withRouter)

export const ChannelMessages = enhance(ChannelMessagesView)
