import React, { Component } from 'react'
import { Form } from 'react-final-form'
import { defineMessages, intlShape } from 'react-intl'
import { compose } from 'ramda'

import { SubmitButton } from '../atoms'
import { FormField, FormHeader } from '../molecules'
import { FormRoot } from '../templates'

import { validateForm } from 'src/lib/form'
import { registerSchema } from 'src/common/schema'
import { withIntl } from 'src/common'

const i18n = defineMessages({
  mainHeader: {
    id: 'register-page.main-header',
    defaultMessage: 'Register'
  },
  subHeader: {
    id: 'register-page.sub-header',
    defaultMessage: 'Fill out the form and join the talkbox community!'
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
    intl: intlShape
  }

  render() {
    const { intl } = this.props

    return (
      <Form
        subscription={{ submitting: true, pristine: true }}
        validate={validateForm({ schema: registerSchema })}
        onSubmit={(values) => console.log(values)}
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

            <FormField
              name="password"
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

const enhance = compose(withIntl)

export const RegisterPage = enhance(RegisterPageView)
