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
    subscribeToNewComments: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    this.props.subscribeToNewComments()
  }

  render() {
    const { messages } = this.props

    return (
      <ScrollContainer>
        <Root>
          {messages.map((message) => (
            <MessagesItem message={message} key={message.id} />
          ))}
        </Root>
      </ScrollContainer>
    )
  }
}
