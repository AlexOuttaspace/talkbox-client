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
    id: 'add-dm-user-form.title',
    defaultMessage: 'Select user to chat with'
  },
  usernameInputPlaceholder: {
    id: 'add-dm-user-form.input.email.placeholder',
    defaultMessage: 'Username'
  },
  submitButton: {
    id: 'add-dm-user-form.submit-button',
    defaultMessage: 'Start chat'
  }
})

class AddDirectMessageChatView extends Component {
  static propTypes = {
    intl: intlShape,
    router: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired
  }

  onSubmit = async ({ username }) => {
    try {
      console.log(username)
    } catch (error) {
      if (error.message.includes('Not authenticated')) {
        storeTokensInCookie(null, null)
        return Router.pushRoute('/login')
      }
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
                name="username"
                type="text"
                placeholder={intl.formatMessage(i18n.usernameInputPlaceholder)}
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
  withRouter
)

export const AddDirectMessageChat = enhance(AddDirectMessageChatView)
