import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { intlShape, defineMessages } from 'react-intl'
import { compose } from 'ramda'

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
`

const SendMessageView = ({ channelName, intl }) => {
  return (
    <Root>{`${intl.formatMessage(i18n.placeholder)} #${channelName}`}</Root>
  )
}

SendMessageView.propTypes = {
  channelName: PropTypes.string.isRequired,
  intl: intlShape
}

const enhance = compose(withIntl)

export const SendMessage = enhance(SendMessageView)
