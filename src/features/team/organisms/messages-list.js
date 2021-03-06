import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import { compose } from 'ramda'

import { ScrollContainer } from '../templates'
import { MessagesItem } from '../molecules'
import { propShapes } from '../common'
import { FileUpload } from '../atoms'

const Root = styled.ul`
  list-style-type: none;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
`

export class MessagesListView extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(propShapes.message).isRequired,
    subscribeToNewMessages: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    fetchMoreMessages: PropTypes.func
  }

  static defaultProps = {
    fetchMoreMessages: () => {}
  }

  constructor(props) {
    super(props)
    this.scrollbarRef = React.createRef()
    this.unsubscribe = () => {} // method placeholder
  }

  componentDidMount = () => {
    this.scrollbarRef.current.scrollToBottom()
    this.unsubscribe = this.props.subscribeToNewMessages()
  }

  getSnapshotBeforeUpdate = () => {
    const currentlyScrolledToBottom =
      this.scrollbarRef.current.getValues().top > 0.95

    return { currentlyScrolledToBottom }
  }

  componentDidUpdate(prevProps, _, { currentlyScrolledToBottom }) {
    const newMessagesArrived =
      prevProps.messages.length < this.props.messages.length

    const switchedToAnotherChat =
      prevProps.router.query.messagesId !==
        this.props.router.query.messagesId ||
      prevProps.router.query.teamId !== this.props.router.query.teamId

    // when new messages arrive, they appear below last message in the least
    // and outside of current viewbox, so we need to scroll down everytime a new
    // message arrive, but only if user is already is scrolled to bottom
    const shouldScrollToBottom =
      (newMessagesArrived && currentlyScrolledToBottom) || switchedToAnotherChat

    if (shouldScrollToBottom) {
      this.scrollbarRef.current.scrollToBottom()
    }

    if (switchedToAnotherChat) {
      this.resubscribe()
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  resubscribe() {
    /*
      after page is loaded and channel is switched for
      the first time, only componentWillUnmount gets called,
      but on later channel switches componentDidUpdate gets called,
      so we have to call this method in both lifecycle methods
    */
    this.unsubscribe()
    this.unsubscribe = this.props.subscribeToNewMessages()
  }

  render() {
    const { messages, fetchMoreMessages } = this.props

    return (
      <ScrollContainer
        onUpdate={({ top }) => {
          if (top === 0) fetchMoreMessages()
        }}
        ref={this.scrollbarRef}
      >
        <FileUpload RootComponent={Root} disableClick>
          <Fragment>
            {messages
              .slice()
              .reverse()
              .map((message) => (
                <MessagesItem message={message} key={message.id} />
              ))}
          </Fragment>
        </FileUpload>
      </ScrollContainer>
    )
  }
}

const enhance = compose(withRouter)

export const MessagesList = enhance(MessagesListView)
