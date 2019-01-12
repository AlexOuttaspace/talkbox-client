import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, defineMessages } from 'react-intl'
import { compose } from 'ramda'
import { graphql } from 'react-apollo'

import { propShapes } from '../common'
import { MessageInput } from '../molecules'

import { withIntl } from 'src/common'
import { createMessageMutation } from 'src/services'

const i18n = defineMessages({
  placeholder: {
    id: 'chat-page.message-input.placeholder',
    defaultMessage: 'Message'
  }
})

class SendChannelMessageView extends Component {
  static propTypes = {
    channel: propShapes.channel,
    intl: intlShape,
    createMessageMutation: PropTypes.func.isRequired
  }

  onSubmit = (values) => {
    const { createMessageMutation, channel } = this.props

    createMessageMutation({
      variables: {
        channelId: channel.id,
        text: values.message
      }
    })
  }

  render() {
    const { channel, intl } = this.props

    const placeholder = `${intl.formatMessage(i18n.placeholder)} #${
      channel.name
    }`

    return <MessageInput onSubmit={this.onSubmit} placeholder={placeholder} />
  }
}

const enhance = compose(
  withIntl,
  graphql(createMessageMutation, { name: 'createMessageMutation' })
)

export const SendChannelMessage = enhance(SendChannelMessageView)
