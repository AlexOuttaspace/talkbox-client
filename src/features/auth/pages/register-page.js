import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { defineMessages, intlShape } from 'react-intl'
import { compose } from 'ramda'
import { graphql } from 'react-apollo'

import { AuthSwitch } from '../atoms'

import { FormRoot } from 'src/ui/templates'
import { FormField, FormHeader } from 'src/ui/molecules'
import { SubmitButton } from 'src/ui/atoms'
import { validateForm } from 'src/lib'
import { withIntl, registerSchema } from 'src/common'
import { registerMutation } from 'src/services'

const i18n = defineMessages({
  mainHeader: {
    id: 'register-page.main-header',
    defaultMessage: 'Register'
  },
  subHeader: {
    id: 'register-page.sub-header',
    defaultMessage: 'Fill out the form and join the talkbox community!'
  },
  usernamePlaceholder: {
    id: 'register-page.placeholder.username',
    defaultMessage: 'Username'
  },
  emailPlaceholder: {
    id: 'register-page.placeholder.email',
    defaultMessage: 'Email'
  },
  passwordPlaceholder: {
    id: 'register-page.placeholder.password',
    defaultMessage: 'Password'
  },
  confirmPasswordPlaceholder: {
    id: 'register-page.placeholder.confirm-password',
    defaultMessage: 'Confirm password'
  },
  submitButton: {
    id: 'register-page.submit-button',
    defaultMessage: 'Submit'
  },
  authSwitchTitle: {
    id: 'register-page.auth-switch.title',
    defaultMessage: 'Already have an account?'
  },
  authSwitchText: {
    id: 'register-page.auth-switch.text',
    defaultMessage: 'Login!'
  }
})

const onSubmit = async (mutate, values) => {
  try {
    const { username, email, password } = values
    const response = await mutate({ variables: { username, email, password } })

    const { register } = response.data
    if (!register.ok) {
      return register.errors.reduce((acc, error) => {
        acc[error.path] = error.message
        return acc
      }, {})
    }
  } catch (error) {
    // TODO: add handling for network errors
  }
}

const RegisterPageView = ({ intl, mutate }) => (
  <main>
    <Form
      subscription={{ submitting: true, pristine: true }}
      validate={validateForm({ schema: registerSchema })}
      onSubmit={(values) => onSubmit(mutate, values)}
    >
      {({ handleSubmit }) => (
        <FormRoot onSubmit={handleSubmit}>
          <FormHeader
            mainHeading={intl.formatMessage(i18n.mainHeader)}
            subHeading={intl.formatMessage(i18n.subHeader)}
          />

          <FormField
            name="username"
            type="text"
            placeholder={intl.formatMessage(i18n.usernamePlaceholder)}
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

          <FormField
            name="passwordConfirmation"
            type="password"
            placeholder={intl.formatMessage(i18n.confirmPasswordPlaceholder)}
          />

          <SubmitButton type="submit">
            {intl.formatMessage(i18n.submitButton)}
          </SubmitButton>

          <AuthSwitch
            title={intl.formatMessage(i18n.authSwitchTitle)}
            textInsideLink={intl.formatMessage(i18n.authSwitchText)}
            route="login"
          />
        </FormRoot>
      )}
    </Form>
  </main>
)

RegisterPageView.propTypes = {
  intl: intlShape,
  mutate: PropTypes.func.isRequired
}

const enhance = compose(
  withIntl,
  graphql(registerMutation)
)

export const RegisterPage = enhance(RegisterPageView)
