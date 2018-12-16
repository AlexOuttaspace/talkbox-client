import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { defineMessages, intlShape } from 'react-intl'
import { compose } from 'ramda'
import { graphql } from 'react-apollo'

import { SubmitButton, AuthSwitch } from '../atoms'
import { FormField, FormHeader } from '../molecules'
import { FormRoot } from '../templates'

import { validateForm } from 'src/lib'
import {
  withIntl,
  loginSchema,
  storeTokenMutation,
  storeTokensInCookie
} from 'src/common'
import { loginMutation } from 'src/services'

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

const onSubmit = async (loginMutation, storeTokenMutation, values) => {
  const { email, password } = values
  const response = await loginMutation({ variables: { email, password } })

  const { token, refreshToken } = response.data.login

  // we need to store cookies both in apollo cache and cookies, as we can only access cookies on server
  storeTokenMutation({ variables: { token, refreshToken } })
  storeTokensInCookie(token, refreshToken)
}

const LoginPageView = ({ intl, loginMutation, storeTokenMutation }) => (
  <main>
    <Form
      subscription={{ submitting: true }}
      validate={validateForm({ schema: loginSchema })}
      onSubmit={(values) => onSubmit(loginMutation, storeTokenMutation, values)} // TODO: refactor this using react hooks
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

          <AuthSwitch title="reeeeeeeee" textInsideLink="lol" route="/" />
        </FormRoot>
      )}
    </Form>
  </main>
)

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
