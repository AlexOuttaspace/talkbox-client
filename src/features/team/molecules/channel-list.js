import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { defineMessages, intlShape } from 'react-intl'
import { compose } from 'ramda'

import { propShapes } from '../common'
import { Channel, AddChannelButton } from '../atoms'

import { withIntl } from 'src/common'

const i18n = defineMessages({
  channels: {
    id: 'chat-page.sidebar.channels-list.title',
    defaultMessage: 'Channels'
  }
})

const Root = styled.ul`
  list-style-type: none;
  margin-bottom: 18px;
`

const Header = styled.header`
  width: 100%;
  padding: 0 0.75rem 0 1rem;
  height: 26px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.h3`
  font-size: 1rem;
`

export const ChannelListView = ({ channels, intl }) => {
  return (
    <Root>
      <Header>
        <Title>{intl.formatMessage(i18n.channels)}</Title>
        <AddChannelButton />
      </Header>
      {channels.map((channel) => (
        <Channel key={channel.id} channel={channel} />
      ))}
    </Root>
  )
}

ChannelListView.propTypes = {
  intl: intlShape,
  channels: PropTypes.arrayOf(propShapes.channel)
}

const enhance = compose(withIntl)

export const ChannelList = enhance(ChannelListView)
