import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { compose } from 'ramda'
import { Query } from 'react-apollo'

import { MessagesList } from './messages-list'

import { directMessagesQuery, newDirectMessageSubscription } from 'src/services'

const DirectMessagesView = ({ router }) => {
  const teamId = +router.query.teamId
  const otherUserId = +router.query.messagesId
  // only refetch on client
  const fetchPolicy = process.browser ? 'cache-and-network' : 'cache-first'

  return (
    <Query
      query={directMessagesQuery}
      variables={{ teamId, otherUserId }}
      fetchPolicy={fetchPolicy}
    >
      {({ error, data, subscribeToMore }) => {
        if (error) {
          console.log(error)
          return <div>error</div>
        }

        if (!data) return null

        const messages = data.directMessages.map((message) => ({
          ...message,
          user: message.sender
        }))

        return (
          <MessagesList
            subscribeToNewMessages={() =>
              subscribeToMore({
                document: newDirectMessageSubscription,
                variables: { teamId, userId: otherUserId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData) return prev

                  return {
                    ...prev,
                    directMessages: [
                      ...prev.directMessages,
                      subscriptionData.data.newDirectMessage
                    ]
                  }
                },
                onError: (error) => console.log(error)
              })
            }
            messages={messages || []}
          />
        )
      }}
    </Query>
  )
}

DirectMessagesView.propTypes = {
  router: PropTypes.object.isRequired
}

const enhance = compose(withRouter)

export const DirectMessages = enhance(DirectMessagesView)
