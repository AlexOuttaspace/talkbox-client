import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { propShapes } from '../common'
import { Channel } from '../atoms'

const Root = styled.ul`
  list-style-type: none;
`

export const ChannelList = ({ channels }) => {
  return (
    <Root>
      {channels.map((channel) => (
        <Channel key={channel.id} channel={channel} />
      ))}
    </Root>
  )
}

ChannelList.propTypes = {
  channels: PropTypes.arrayOf(propShapes.channel)
}
