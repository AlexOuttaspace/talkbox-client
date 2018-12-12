import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { defineMessages, intlShape } from 'react-intl'
import { compose } from 'ramda'
import { graphql } from 'react-apollo'

import { SubmitButton, AuthSwitch } from '../atoms'
import { FormField, FormHeader } from '../molecules'
import { FormRoot } from '../templates'

import { validateForm } from 'src/lib'
import { withIntl, loginSchema } from 'src/common'
import { registerMutation } from 'src/services'

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
  }
})

class LoginPageView extends Component {
  static propTypes = {
    intl: intlShape,
    mutate: PropTypes.func.isRequired
  }

  onSubmit = async (values) => {
    const { mutate } = this.props
    const { username, email, password } = values
    const response = await mutate({ variables: { username, email, password } })

    console.log(response)
  }

  render() {
    const { intl } = this.props

    return (
      <main>
        <Form
          subscription={{ submitting: true, pristine: true }}
          validate={validateForm({ schema: loginSchema })}
          onSubmit={this.onSubmit}
        >
          {({ handleSubmit, pristine, invalid, submitting }) => (
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

              <SubmitButton
                type="submit"
                disabled={pristine || invalid || submitting}
              >
                {intl.formatMessage(i18n.submitButton)}
              </SubmitButton>
              <AuthSwitch
                title="Don't have an account yet?"
                textInsideLink="Join talkbox!"
                route="register"
              />
            </FormRoot>
          )}
        </Form>
      </main>
    )
  }
}

const enhance = compose(
  withIntl,
  graphql(registerMutation)
)

export const LoginPage = enhance(LoginPageView)
