import React from 'react'
import styled from 'styled-components'
import { lighten, transparentize } from 'polished'
import PropTypes from 'prop-types'

import { propShapes } from '../common'

import { Link } from 'server/routes'

const Root = styled.li`
  flex-shrink: 0;
  margin-bottom: 8px;
`

const LinkElement = styled.a`
  display: block;
  color: ${(p) => lighten(0.7, p.theme.purpleWhite)};
  background-color: ${(p) => transparentize(0.7, p.theme.white)};
  width: 55px;
  height: 55px;
  font-size: 38px;
  border-radius: 12px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;

  transition: box-shadow 0.1s;
  :hover {
    box-shadow: inset 0 0 5px 2px ${(p) => transparentize(0.7, p.theme.white)};
  }

  ${(p) =>
    p.isCurrent &&
    `
    box-shadow: inset 0 0 5px 2px ${transparentize(0.7, p.theme.white)};
  `};

  :focus,
  :active,
  :visited {
    text-decoration: none;
    color: inherit;
  }
`

export const Team = ({ team, isCurrent, messagesId }) => (
  <Root>
    <Link route={`/team/${team.id}/${messagesId}`}>
      <LinkElement isCurrent={isCurrent}>{team.name}</LinkElement>
    </Link>
  </Root>
)

Team.propTypes = {
  team: propShapes.team,
  messagesId: PropTypes.number.isRequired,
  isCurrent: PropTypes.bool.isRequired
}
