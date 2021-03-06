import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'ramda'
import { Form, Field } from 'react-final-form'
import { intlShape, defineMessages } from 'react-intl'
import { withRouter } from 'next/router'
import { graphql, Query } from 'react-apollo'

import { ModalFormRoot, MultiSelectUser } from '../atoms'

import { Router } from 'server/routes'
import {
  createChannelMutation,
  meQuery,
  getTeamMembersQuery
} from 'src/services'
import { SubmitButton, Checkbox } from 'src/ui/atoms'
import { FormField, FormHeader } from 'src/ui/molecules'
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
  },
  checkbox: {
    id: 'add-channel-form.isPrivate-checkbox.label',
    defaultMessage: 'Private'
  }
})

const StyledCheckbox = styled(Checkbox)`
  align-self: flex-start;
  margin-bottom: 2rem;
`

class AddChannelFormView extends Component {
  static propTypes = {
    intl: intlShape,
    router: PropTypes.object.isRequired,
    createChannelMutation: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
  }

  onSubmit = async ({ name, isPrivate, users }) => {
    const {
      closeModal,
      createChannelMutation,
      router: { query }
    } = this.props

    const teamId = +query.teamId
    try {
      await createChannelMutation({
        variables: {
          teamId,
          name,
          private: isPrivate,
          members: users.map((user) => user.value)
        },
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

          const data = store.readQuery({ query: meQuery })
          const teamIndex = data.me.teams.findIndex(
            (team) => team.id === teamId
          )

          data.me.teams[teamIndex].channels.push(channel)

          store.writeQuery({ query: meQuery, data })

          // if it is not an optimistic response
          if (channel.id !== -1)
            return Router.pushRoute(`/team/${teamId}/channel/${channel.id}`)
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
    const { intl, router } = this.props
    const teamId = +router.query.teamId

    return (
      <main>
        <Form
          subscription={{ submitting: true, values: true }}
          initialValues={{ isPrivate: false, users: [] }}
          validate={validateForm({ schema: createChannelSchema })}
          onSubmit={this.onSubmit}
        >
          {({ handleSubmit, values }) => (
            <ModalFormRoot onSubmit={handleSubmit}>
              <FormHeader mainHeading={intl.formatMessage(i18n.title)} />

              <FormField
                name="name"
                type="text"
                placeholder={intl.formatMessage(i18n.nameInputPlaceholder)}
              />

              <Field name="isPrivate" type="checkbox">
                {({ input: { value, onChange, ...inputProps } }) => (
                  <StyledCheckbox
                    value={value}
                    onChange={onChange}
                    labelText={intl.formatMessage(i18n.checkbox)}
                    inputProps={inputProps}
                  />
                )}
              </Field>

              {values.isPrivate && (
                <Query query={getTeamMembersQuery} variables={{ teamId }}>
                  {({ loading, error, data }) => (
                    <Field name="users" type="checkbox">
                      {({ input: { value, onChange, name } }) => {
                        const options =
                          loading || error
                            ? []
                            : data.getTeamMembers.map((member) => ({
                                label: member.username,
                                value: member.id
                              }))

                        return (
                          <MultiSelectUser
                            value={value}
                            onChange={onChange}
                            name={name}
                            options={options}
                            labelText={intl.formatMessage(i18n.checkbox)}
                          />
                        )
                      }}
                    </Field>
                  )}
                </Query>
              )}

              <SubmitButton type="submit">
                {intl.formatMessage(i18n.submitButton)}
              </SubmitButton>
            </ModalFormRoot>
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
