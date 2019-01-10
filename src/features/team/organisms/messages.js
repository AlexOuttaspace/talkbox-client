import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { compose } from 'ramda'
import { Query } from 'react-apollo'

import { MessagesList } from './messages-list'

import { messagesQuery, newChannelMessageSubscription } from 'src/services'

export const MessagesView = ({ router }) => {
  const channelId = +router.query.messagesId
  // only refetch on client
  const fetchPolicy = process.browser ? 'cache-and-network' : 'cache-first'
  return (
    <Query
      query={messagesQuery}
      variables={{ channelId }}
      fetchPolicy={fetchPolicy}
    >
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

                  return {
                    ...prev,
                    messages: [
                      ...prev.messages,
                      subscriptionData.data.newChannelMessage
                    ]
                  }
                },
                onError: (error) => console.log(error)
              })
            }
            channelId={channelId}
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
