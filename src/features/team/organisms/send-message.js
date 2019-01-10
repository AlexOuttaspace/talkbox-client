import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { intlShape, defineMessages } from 'react-intl'
import { compose } from 'ramda'
import { Form, Field } from 'react-final-form'
import { graphql } from 'react-apollo'

import { propShapes } from '../common'

import { withIntl } from 'src/common'
import { createMessageMutation } from 'src/services'

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
    channel: propShapes.channel,
    intl: intlShape,
    createMessageMutation: PropTypes.func.isRequired
  }

  onSubmit = (values) => {
    const { createMessageMutation, channel } = this.props

    createMessageMutation({
      variables: {
        channelId: channel.id,
        text: values.message
      }
    })
  }

  render() {
    const { channel, intl } = this.props

    return (
      <Root>
        <Form subscription={{ submitting: true }} onSubmit={this.onSubmit}>
          {({ handleSubmit, form: { reset } }) => (
            <FormRoot
              autoComplete="off"
              onSubmit={(event) => {
                handleSubmit(event)
                reset()
              }}
            >
              <Field name="message">
                {({ input }) => (
                  <MessageInput
                    type="text"
                    {...input}
                    placeholder={`${intl.formatMessage(i18n.placeholder)} #${
                      channel.name
                    }`}
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

const enhance = compose(
  withIntl,
  graphql(createMessageMutation, { name: 'createMessageMutation' })
)

export const SendMessage = enhance(SendMessageView)
