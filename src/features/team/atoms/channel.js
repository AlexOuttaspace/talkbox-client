import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { lighten } from 'polished'

import { propShapes } from '../common'

import { Link } from 'server/routes'

const Root = styled.li`
  width: 100%;
`

const LinkElement = styled.a`
  text-decoration: inherit;
  color: inherit;

  :focus,
  :hover,
  :active {
    text-decoration: inherit;
    color: inherit;
  }

  width: 100%;
  height: 26px;

  display: flex;
  align-items: center;

  padding: 0 0.75rem 0 1rem;

  font-size: 1rem;

  cursor: pointer;
  :hover,
  :focus {
    background-color: ${(p) => p.theme.purpleHover};
  }

  :before {
    content: '#';
    margin-right: 6px;
  }

  :focus {
    box-shadow: none;
    color: ${(p) => p.theme.purpleWhite};
  }

  ${(p) =>
    p.selected &&
    `
    background-color: ${p.theme.green};
    color: ${lighten(0.7, p.theme.purpleWhite)};

    :hover, :focus {
      background-color: ${p.theme.green};
      color: ${lighten(0.7, p.theme.purpleWhite)};
    }

    :focus {
      color: ${lighten(0.7, p.theme.purpleWhite)};
    }
  `};
`

export const Channel = ({ channel, selected, teamId }) => {
  const route = `/team/${teamId}/${channel.id}`
  return (
    <Root>
      <Link route={route}>
        <LinkElement href={route} selected={selected}>
          {channel.name}
        </LinkElement>
      </Link>
    </Root>
  )
}

Channel.propTypes = {
  channel: propShapes.channel,
  selected: PropTypes.bool.isRequired,
  teamId: PropTypes.number.isRequired
}
