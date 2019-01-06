import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { intlShape, defineMessages } from 'react-intl'
import { compose } from 'ramda'
import { Form, Field } from 'react-final-form'

import { withIntl } from 'src/common'

const i18n = defineMessages({
  placeholder: {
    id: 'chat-page.message-input.placeholder',
    defaultMessage: 'Message'
  }
})

const Root = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
`

const MessageInput = styled.input`
  width: 100%;
  height: 44px;
  padding-left: 8px;

  border: 1.5px solid ${(p) => p.theme.gray300};
  border-radius: 6px;

  :focus {
    outline: none;
    box-shadow: none;
    border-color: ${(p) => p.theme.gray500};
  }
`

const FormRoot = styled.form`
  width: 100%;
  margin: 0 1.125rem;
`

class SendMessageView extends Component {
  static propTypes = {
    channelName: PropTypes.string.isRequired,
    intl: intlShape
  }

  onSubmit = async (values) => {
    console.log(values)
  }

  render() {
    const { channelName, intl } = this.props

    return (
      <Root>
        <Form subscription={{ submitting: true }} onSubmit={this.onSubmit}>
          {({ handleSubmit, form: { reset } }) => (
            <FormRoot onSubmit={(event) => handleSubmit(event).then(reset)}>
              <Field name="message">
                {({ input }) => (
                  <MessageInput
                    type="text"
                    {...input}
                    placeholder={`${intl.formatMessage(
                      i18n.placeholder
                    )} #${channelName}`}
                  />
                )}
              </Field>
            </FormRoot>
          )}
        </Form>
      </Root>
    )
  }
}

const enhance = compose(withIntl)

export const SendMessage = enhance(SendMessageView)
