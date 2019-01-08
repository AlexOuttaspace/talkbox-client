import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'ramda'
import { Form } from 'react-final-form'
import { intlShape, defineMessages } from 'react-intl'
import { withRouter } from 'next/router'
import { graphql } from 'react-apollo'

import { Router } from 'server/routes'
import { addMemberMutation } from 'src/services'
import { SubmitButton } from 'src/ui/atoms'
import { FormField, FormHeader } from 'src/ui/molecules'
import { FormRoot } from 'src/ui/templates'
import { validateForm, handleServerErrors } from 'src/lib'
import { addMemberSchema, withIntl, storeTokensInCookie } from 'src/common'

const i18n = defineMessages({
  title: {
    id: 'invite-user-form.title',
    defaultMessage: 'Invite users to your team'
  },
  emailInputPlaceholder: {
    id: 'invite-user-form.input.email.placeholder',
    defaultMessage: "User's email"
  },
  submitButton: {
    id: 'invite-user-form.submit-button',
    defaultMessage: 'Send invite'
  }
})

class InviteUserFormView extends Component {
  static propTypes = {
    intl: intlShape,
    router: PropTypes.object.isRequired,
    addMemberMutation: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
  }

  onSubmit = async ({ email }) => {
    const {
      closeModal,
      addMemberMutation,
      router: { query }
    } = this.props

    const teamId = +query.teamId
    try {
      const {
        data: { addTeamMember }
      } = await addMemberMutation({
        variables: { teamId, email }
      })

      console.log(addTeamMember)

      if (!addTeamMember.ok) {
        return handleServerErrors(addTeamMember.errors)
      }

      return closeModal()
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
          validate={validateForm({ schema: addMemberSchema })}
          onSubmit={this.onSubmit}
        >
          {({ handleSubmit }) => (
            <FormRoot onSubmit={handleSubmit}>
              <FormHeader mainHeading={intl.formatMessage(i18n.title)} />

              <FormField
                name="email"
                type="text"
                placeholder={intl.formatMessage(i18n.emailInputPlaceholder)}
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
  graphql(addMemberMutation, { name: 'addMemberMutation' })
)

export const InviteUserForm = enhance(InviteUserFormView)
