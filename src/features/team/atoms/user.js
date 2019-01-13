import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
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
    content: '';
    width: 10px;
    height: 10px;
    background-color: ${(p) => p.theme.green};
    border-radius: 50%;
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

    :before {
      background-color: ${lighten(0.7, p.theme.green)};
    }

    :focus {
      color: ${lighten(0.7, p.theme.purpleWhite)};
    }
  `};
`

export const User = ({ user, teamId, selected }) => {
  const route = `/team/${teamId}/user/${user.id}`

  return (
    <Root>
      <Link key={user.id} route={route}>
        <LinkElement selected={selected} href={route}>
          {user.username}
        </LinkElement>
      </Link>
    </Root>
  )
}

User.propTypes = {
  selected: PropTypes.bool.isRequired,
  teamId: PropTypes.number.isRequired,
  user: propShapes.user
}
