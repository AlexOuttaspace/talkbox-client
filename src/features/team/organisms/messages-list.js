import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ScrollContainer } from '../templates'
import { MessagesItem } from '../molecules'
import { propShapes } from '../common'

const Root = styled.ul`
  list-style-type: none;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
`

export class MessagesList extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(propShapes.message).isRequired,
    subscribeToNewMessages: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.scrollbarRef = React.createRef()
  }

  componentDidMount = () => {
    this.scrollbarRef.current.scrollToBottom()
    this.props.subscribeToNewMessages()
  }

  getSnapshotBeforeUpdate(prevProps) {
    // we return here a boolean that is used to determine,
    // whether we need to adjust scroll
    const newMessagesArrived =
      prevProps.messages.length < this.props.messages.length
    const currentlyScrolledToBottom =
      this.scrollbarRef.current.getValues().top === 1

    if (newMessagesArrived && currentlyScrolledToBottom) {
      return true
    }
    return false
  }

  componentDidUpdate(prevProps, prevState, shouldMoveScrollToBottom) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    console.log(shouldMoveScrollToBottom)
    if (shouldMoveScrollToBottom) {
      this.scrollbarRef.current.scrollToBottom()
    }
  }

  render() {
    const { messages } = this.props

    return (
      <ScrollContainer ref={this.scrollbarRef}>
        <Root>
          {messages.map((message) => (
            <MessagesItem message={message} key={message.id} />
          ))}
        </Root>
      </ScrollContainer>
    )
  }
}
