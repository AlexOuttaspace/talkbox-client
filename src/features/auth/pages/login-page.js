import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { defineMessages, intlShape } from 'react-intl'
import { compose } from 'ramda'
import { graphql } from 'react-apollo'

import { AuthSwitch } from '../atoms'

import { FormRoot } from 'src/ui/templates'
import { SubmitButton } from 'src/ui/atoms'
import { FormField, FormHeader } from 'src/ui/molecules'
import { Router } from 'server/routes'
import {
  withIntl,
  storeTokenMutation,
  storeTokensInCookie,
  loginSchema
} from 'src/common'
import { loginMutation } from 'src/services'
import { validateForm, handleServerErrors } from 'src/lib'

const i18n = defineMessages({
  mainHeader: {
    id: 'login-page.main-header',
    defaultMessage: 'Login'
  },
  subHeader: {
    id: 'login-page.sub-header',
    defaultMessage: 'Welcome back!'
  },
  emailPlaceholder: {
    id: 'login-page.placeholder.email',
    defaultMessage: 'Email'
  },
  passwordPlaceholder: {
    id: 'login-page.placeholder.password',
    defaultMessage: 'Password'
  },
  submitButton: {
    id: 'login-page.submit-button',
    defaultMessage: 'Submit'
  },
  authSwitchTitle: {
    id: 'login-page.auth-switch.title',
    defaultMessage: "Don't have an account yet?"
  },
  authSwitchText: {
    id: 'login-page.auth-switch.text',
    defaultMessage: 'Join talkbox!'
  }
})

class LoginPageView extends Component {
  onSubmit = async ({ email, password }) => {
    try {
      const { loginMutation, storeTokenMutation } = this.props

      const {
        data: { login }
      } = await loginMutation({ variables: { email, password } })

      if (!login.ok) {
        return handleServerErrors(login.errors)
      }

      const { token, refreshToken } = login

      // we need to store cookies both in apollo cache and cookies, as we can only access cookies on server
      storeTokenMutation({ variables: { token, refreshToken } })
      storeTokensInCookie(token, refreshToken)

      Router.pushRoute('/chat')
    } catch (error) {
      // errors occured due to incorrect password/email should not be handled here
      console.log(error)
    }
  }

  render() {
    const { intl } = this.props

    return (
      <main>
        <Form
          subscription={{ submitting: true }}
          validate={validateForm({ schema: loginSchema })}
          onSubmit={(values) => this.onSubmit(values)} // TODO: refactor this using react hooks
        >
          {({ handleSubmit }) => (
            <FormRoot onSubmit={handleSubmit}>
              <FormHeader
                mainHeading={intl.formatMessage(i18n.mainHeader)}
                subHeading={intl.formatMessage(i18n.subHeader)}
              />

              <FormField
                name="email"
                type="text"
                placeholder={intl.formatMessage(i18n.emailPlaceholder)}
              />

              <FormField
                name="password"
                type="password"
                placeholder={intl.formatMessage(i18n.passwordPlaceholder)}
              />

              <SubmitButton type="submit">
                {intl.formatMessage(i18n.submitButton)}
              </SubmitButton>

              <AuthSwitch
                title={intl.formatMessage(i18n.authSwitchTitle)}
                textInsideLink={intl.formatMessage(i18n.authSwitchText)}
                route="register"
              />
            </FormRoot>
          )}
        </Form>
      </main>
    )
  }
}

LoginPageView.propTypes = {
  intl: intlShape,
  loginMutation: PropTypes.func.isRequired,
  storeTokenMutation: PropTypes.func.isRequired
}

const enhance = compose(
  withIntl,
  graphql(loginMutation, { name: 'loginMutation' }),
  graphql(storeTokenMutation, { name: 'storeTokenMutation' })
)

export const LoginPage = enhance(LoginPageView)
