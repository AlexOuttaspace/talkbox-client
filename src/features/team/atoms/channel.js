import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { lighten } from 'polished'

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

  ${(p) =>
    p.selected &&
    `
    background-color: ${p.theme.green};
    color: ${lighten(0.7, p.theme.purpleWhite)}

    :hover {
      background-color: ${p.theme.green};
      color: ${lighten(0.7, p.theme.purpleWhite)}
    }
  `};
`

export const Channel = ({ channel, selected }) => {
  return <Root selected={selected}>{channel.name}</Root>
}

Channel.propTypes = {
  channel: propShapes.channel,
  selected: PropTypes.bool.isRequired
}
