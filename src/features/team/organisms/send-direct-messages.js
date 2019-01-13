import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, defineMessages } from 'react-intl'
import { compose } from 'ramda'
import { graphql } from 'react-apollo'

import { propShapes } from '../common'
import { MessageInput } from '../molecules'

import { withIntl } from 'src/common'
import { createDirectMessageMutation } from 'src/services'

const i18n = defineMessages({
  placeholder: {
    id: 'chat-page.message-input.placeholder',
    defaultMessage: 'Message'
  }
})

class SendDirectMessageView extends Component {
  static propTypes = {
    receiverId: PropTypes.number.isRequired,
    teamId: PropTypes.number.isRequired,
    intl: intlShape,
    createDirectMessageMutation: PropTypes.func.isRequired
  }

  onSubmit = async (values) => {
    const { createDirectMessageMutation, receiverId, teamId } = this.props

    const response = await createDirectMessageMutation({
      variables: {
        receiverId,
        teamId,
        text: values.message
      }
    })

    console.log(response)
  }

  render() {
    const { intl } = this.props

    const placeholder = `${intl.formatMessage(i18n.placeholder)}`

    return <MessageInput onSubmit={this.onSubmit} placeholder={placeholder} />
  }
}

const enhance = compose(
  withIntl,
  graphql(createDirectMessageMutation, { name: 'createDirectMessageMutation' })
)

export const SendDirectMessage = enhance(SendDirectMessageView)
