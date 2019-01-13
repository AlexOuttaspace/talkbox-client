import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'ramda'
import { intlShape, defineMessages } from 'react-intl'

import { AddChatUserList } from '../molecules'

import { Input } from 'src/ui/atoms'
import { FormHeader } from 'src/ui/molecules'
import { withIntl } from 'src/common'

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

const StyledModalFormRoot = styled.div`
  margin-top: 30vh;
  max-width: 44rem;
  flex-shrink: 0;

  margin-left: auto;
  margin-right: auto;
  width: 95vw;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const MainRoot = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`

class AddDirectMessageChatView extends Component {
  static propTypes = {
    intl: intlShape,
    closeModal: PropTypes.func.isRequired
  }

  state = {
    value: ''
  }

  onChange = (e) => this.setState({ value: e.target.value })

  render() {
    const { intl, closeModal } = this.props
    const { value } = this.state

    return (
      <MainRoot>
        <StyledModalFormRoot>
          <FormHeader mainHeading={intl.formatMessage(i18n.title)} />

          <Input
            onChange={this.onChange}
            value={value}
            name="username"
            type="text"
            placeholder={intl.formatMessage(i18n.usernameInputPlaceholder)}
          />
        </StyledModalFormRoot>

        <AddChatUserList onSelect={closeModal} currentInputValue={value} />
      </MainRoot>
    )
  }
}

const enhance = compose(withIntl)

export const AddDirectMessageChat = enhance(AddDirectMessageChatView)
