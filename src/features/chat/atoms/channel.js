import React from 'react'
import styled from 'styled-components'

import { propShapes } from '../common'

const Root = styled.li``

export const Channel = ({ channel }) => {
  return <Root>{channel.name}</Root>
}

Channel.propTypes = {
  channel: propShapes.channel
}
