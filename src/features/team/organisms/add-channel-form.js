import React, { Component } from 'react'
import styled from 'styled-components'
import { compose } from 'ramda'
import { Form } from 'react-final-form'
import { intlShape, defineMessages } from 'react-intl'

import { SubmitButton } from 'src/ui/atoms'
import { FormField, FormHeader } from 'src/ui/molecules'
import { FormRoot } from 'src/ui/templates'
import { validateForm, handleServerErrors } from 'src/lib'
import { createChannelSchema, withIntl } from 'src/common'

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
    intl: intlShape
  }

  onSubmit = (values) => {
    console.log(values)
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

const enhance = compose(withIntl)

export const AddChannelForm = enhance(AddChannelFormView)
