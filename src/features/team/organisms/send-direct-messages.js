import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, defineMessages } from 'react-intl'
import { compose } from 'ramda'
import { graphql } from 'react-apollo'

import { propShapes } from '../common'
import { MessageInput } from '../molecules'

import { withIntl } from 'src/common'
import { createDirectMessageMutation, meQuery } from 'src/services'

const i18n = defineMessages({
  placeholder: {
    id: 'chat-page.message-input.placeholder',
    defaultMessage: 'Message'
  }
})

class SendDirectMessageView extends Component {
  static propTypes = {
    receiver: propShapes.user.isRequired,
    teamId: PropTypes.number.isRequired,
    intl: intlShape,
    createDirectMessageMutation: PropTypes.func.isRequired
  }

  onSubmit = async (values) => {
    const { createDirectMessageMutation, receiver, teamId } = this.props

    await createDirectMessageMutation({
      variables: {
        receiverId: receiver.id,
        teamId,
        text: values.message
      },
      optimisticResponse: { createDirectMessage: true },
      update: (store) => {
        const data = store.readQuery({ query: meQuery })

        const teamIdx = data.me.teams.findIndex((team) => team.id === teamId)

        const notAlreadyThere = data.me.teams[
          teamIdx
        ].directMessageMembers.every((member) => member.id !== receiver.id)

        if (notAlreadyThere) {
          data.me.teams[teamIdx].directMessageMembers.push({
            __typename: 'User',
            ...receiver
          })

          store.writeQuery({ query: meQuery, data })
        }
      }
    })
  }

  render() {
    const { intl, receiver } = this.props

    const placeholder = `${intl.formatMessage(i18n.placeholder)} ${
      receiver.username
    }`

    return <MessageInput onSubmit={this.onSubmit} placeholder={placeholder} />
  }
}

const enhance = compose(
  withIntl,
  graphql(createDirectMessageMutation, { name: 'createDirectMessageMutation' })
)

export const SendDirectMessage = enhance(SendDirectMessageView)
