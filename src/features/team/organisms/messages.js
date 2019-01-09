import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import { compose } from 'ramda'
import { Query } from 'react-apollo'

import { ScrollContainer } from '../templates'
import { MessagesItem } from '../molecules'

import { messagesQuery } from 'src/services'

const Root = styled.ul`
  width: 100%;
  height: 100%;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
`

export const MessagesView = ({ router }) => {
  const channelId = +router.query.messagesId

  return (
    <Query query={messagesQuery} variables={{ channelId }}>
      {({ loading, error, data: { messages } }) => {
        if (loading) return <div>loading</div>

        if (error) {
          console.log(error)
          return <div>error</div>
        }
        console.log(messages)
        return (
          <Root>
            <ScrollContainer>
              {messages.map((message) => (
                <MessagesItem message={message} key={message.id} />
              ))}
            </ScrollContainer>
          </Root>
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
