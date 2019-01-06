import React from 'react'
import styled from 'styled-components'
import { lighten, transparentize } from 'polished'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import { compose } from 'ramda'

import { propShapes } from '../common'

import { Link, Router } from 'server/routes'

const Root = styled.li`
  flex-shrink: 0;
  margin-bottom: 8px;
`

const LinkElement = styled.a`
  display: block;
  color: ${(p) => lighten(0.7, p.theme.purpleWhite)};
  background-color: ${(p) => transparentize(0.7, p.theme.white)};
  width: 60px;
  height: 60px;
  font-size: 38px;
  border-radius: 12px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-transform: uppercase;

  transition: box-shadow 0.1s;
  :hover {
    box-shadow: inset 0 0 5px 2px ${(p) => transparentize(0.7, p.theme.white)};
  }

  :focus,
  :active,
  :visited: {
    text-decoration: none;
    color: inherit;
  }
`

const TeamView = withRouter(({ team, ...rest }) => {
  console.log(Router, rest)
  return (
    <Root>
      <Link route="team" params={{ teamId: team.id }}>
        <LinkElement>{team.name}</LinkElement>
      </Link>
    </Root>
  )
})

TeamView.propTypes = {
  team: propShapes.team,
  router: PropTypes.object.isRequired
}

const enhance = compose(withRouter)

export const Team = enhance(TeamView)
