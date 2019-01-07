import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'ramda'
import { Form } from 'react-final-form'
import { intlShape, defineMessages } from 'react-intl'
import { withRouter } from 'next/router'
import { graphql } from 'react-apollo'

import { Router } from 'server/routes'
import { createChannelMutation, allTeamsQuery } from 'src/services'
import { SubmitButton } from 'src/ui/atoms'
import { FormField, FormHeader } from 'src/ui/molecules'
import { FormRoot } from 'src/ui/templates'
import { validateForm } from 'src/lib'
import { createChannelSchema, withIntl, storeTokensInCookie } from 'src/common'

const i18n = defineMessages({
  title: {
    id: 'add-channel-form.title',
    defaultMessage: 'Add channel'
  },
  nameInputPlaceholder: {
    id: 'add-channel-form.input.name.placeholder',
    defaultMessage: 'Channel name'
  },
  submitButton: {
    id: 'add-channel-form.submit-button',
    defaultMessage: 'Create channel'
  }
})

class AddChannelFormView extends Component {
  static propTypes = {
    intl: intlShape,
    router: PropTypes.object.isRequired,
    createChannelMutation: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
  }

  onSubmit = async ({ name }) => {
    const {
      closeModal,
      createChannelMutation,
      router: { query }
    } = this.props

    const teamId = +query.teamId
    try {
      await createChannelMutation({
        variables: { teamId, name },
        // We can use optimisctic response as channel name is not unique.
        // For the same reason we don't need to use handleServerErrors function.
        optimisticResponse: {
          createChannel: {
            __typename: 'Mutation',
            ok: true,
            errors: null,
            channel: {
              __typename: 'Channel',
              id: -1,
              name
            }
          }
        },
        update: (store, { data: { createChannel } }) => {
          const { ok, channel } = createChannel
          if (!ok) return

          const data = store.readQuery({ query: allTeamsQuery })
          const teamIndex = data.allTeams.findIndex(
            (team) => team.id === teamId
          )
          data.allTeams[teamIndex].channels.push(channel)

          store.writeQuery({ query: allTeamsQuery, data })

          // if it is not an optimistic response
          if (channel.id !== -1)
            return Router.pushRoute(`/team/${teamId}/${channel.id}`)
        }
      })
      closeModal()
    } catch (error) {
      if (error.message.includes('Not authenticated')) {
        storeTokensInCookie(null, null)
        return Router.pushRoute('/login')
      }

      // TODO: add handling for network errors
    }
  }

  render() {
    const { intl } = this.props

    return (
      <main>
        <Form
          subscription={{ submitting: true }}
          validate={validateForm({ schema: createChannelSchema })}
          onSubmit={this.onSubmit}
        >
          {({ handleSubmit }) => (
            <FormRoot onSubmit={handleSubmit}>
              <FormHeader mainHeading={intl.formatMessage(i18n.title)} />

              <FormField
                name="name"
                type="text"
                placeholder={intl.formatMessage(i18n.nameInputPlaceholder)}
              />

              <SubmitButton type="submit">
                {intl.formatMessage(i18n.submitButton)}
              </SubmitButton>
            </FormRoot>
          )}
        </Form>
      </main>
    )
  }
}

const enhance = compose(
  withIntl,
  withRouter,
  graphql(createChannelMutation, { name: 'createChannelMutation' })
)

export const AddChannelForm = enhance(AddChannelFormView)
