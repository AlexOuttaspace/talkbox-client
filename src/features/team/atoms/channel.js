import React from 'react'
import styled from 'styled-components'

import { propShapes } from '../common'

const Root = styled.li`
  width: 100%;
  height: 26px;

  display: flex;
  align-items: center;

  padding: 0 0.75rem 0 1rem;

  font-size: 1rem;

  cursor: pointer;
  :hover {
    background-color: ${(p) => p.theme.purpleHover};
  }

  :before {
    content: '#';
    margin-right: 6px;
  }
`

export const Channel = ({ channel }) => {
  return <Root>{channel.name}</Root>
}

Channel.propTypes = {
  channel: propShapes.channel
}
