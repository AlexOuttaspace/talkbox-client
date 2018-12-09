import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { defineMessages, intlShape } from 'react-intl'
import { compose } from 'ramda'
import { graphql } from 'react-apollo'

import { SubmitButton } from '../atoms'
import { FormField, FormHeader } from '../molecules'
import { FormRoot } from '../templates'

import { validateForm } from 'src/lib/form'
import { registerSchema } from 'src/common/schema'
import { withIntl } from 'src/common'
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
  }
})

class RegisterPageView extends Component {
  static propTypes = {
    intl: intlShape,
    mutate: PropTypes.func.isRequired
  }

  onSubmit = async (values) => {
    const { mutate } = this.props
    const { username, email, password } = values // TODO: implement password confirmation on back
    const response = await mutate({ variables: { username, email, password } })

    console.log(response)
  }

  render() {
    const { intl, mutate } = this.props
    console.log(mutate)
    return (
      <Form
        subscription={{ submitting: true, pristine: true }}
        validate={validateForm({ schema: registerSchema })}
        onSubmit={this.onSubmit}
      >
        {({ handleSubmit, pristine, invalid, submitting }) => (
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

            <SubmitButton
              type="submit"
              disabled={pristine || invalid || submitting}
            >
              {intl.formatMessage(i18n.submitButton)}
            </SubmitButton>
          </FormRoot>
        )}
      </Form>
    )
  }
}

const enhance = compose(
  withIntl,
  graphql(registerMutation)
)

export const RegisterPage = enhance(RegisterPageView)
