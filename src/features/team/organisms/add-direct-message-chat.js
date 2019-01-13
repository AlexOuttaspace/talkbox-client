import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'ramda'
import { Form, FormSpy } from 'react-final-form'
import { intlShape, defineMessages } from 'react-intl'
import { withRouter } from 'next/router'
import { graphql } from 'react-apollo'

import { AddChatUserList } from '../molecules'
import { ModalFormRoot } from '../atoms'

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
    defaultMessage: 'Go'
  }
})

const StyledModalFormRoot = styled(ModalFormRoot)`
  margin-top: 30vh;
  max-width: 44rem;
`

const StyledSubmitButton = styled(SubmitButton)`
  margin-bottom: 0;
  flex-basis: 50px;
  margin-left: 2rem;
  font-size: 1.4rem;
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

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
          {({ handleSubmit, ...rest }, ...rest2) => (
            <Fragment>
              {console.log(rest, rest2)}
              <StyledModalFormRoot onSubmit={handleSubmit}>
                <FormHeader mainHeading={intl.formatMessage(i18n.title)} />

                <RowWrapper>
                  <FormField
                    name="username"
                    type="text"
                    placeholder={intl.formatMessage(
                      i18n.usernameInputPlaceholder
                    )}
                  />

                  <StyledSubmitButton type="submit">
                    {intl.formatMessage(i18n.submitButton)}
                  </StyledSubmitButton>
                </RowWrapper>
              </StyledModalFormRoot>
              <FormSpy subscription={{ values: true }}>
                {({ values }) => (
                  <AddChatUserList currentInputValue={values.username} />
                )}
              </FormSpy>
            </Fragment>
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
