import React from 'react'
import styled from 'styled-components'
import { lighten, transparentize } from 'polished'

import { propShapes } from '../common'

const Root = styled.li`
  flex-shrink: 0;
  margin-bottom: 8px;
  color: ${(p) => lighten(0.7, p.theme.purpleWhite)};
  background-color: ${(p) => transparentize(0.7, p.theme.white)};
  width: 60px;
  height: 60px;
  font-size: 42px;
  border-radius: 8px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: box-shadow 0.1s;
  :hover {
    box-shadow: inset 0 0 5px 2px ${(p) => transparentize(0.7, p.theme.white)};
  }
`

export const Team = ({ team }) => {
  return <Root>{team.name}</Root>
}

Team.propTypes = {
  team: propShapes.team
}
