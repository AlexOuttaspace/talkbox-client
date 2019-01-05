import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { lighten } from 'polished'

const Root = styled.header`
  cursor: pointer;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  :hover {
    background-color: ${(p) => p.theme.purpleHover};
  }
`

const TeamName = styled.h1`
  font-size: 1.125rem;
  padding: 0 0.75rem 0 1rem;
  margin: 0;

  color: ${(p) => lighten(0.7, p.theme.purpleWhite)};
`

const CurrentUser = styled.div`
  width: 100%;
  height: 26px;

  display: flex;
  align-items: center;

  padding: 0 0.75rem 0 1rem;

  font-size: 1rem;
  :before {
    content: '';
    width: 10px;
    height: 10px;
    background-color: ${(p) => p.theme.green};
    border-radius: 50%;
    margin-right: 6px;
  }
`

export const SidebarHeader = ({ teamName, username }) => (
  <Root>
    <TeamName>{teamName}</TeamName>
    <CurrentUser>{username}</CurrentUser>
  </Root>
)

SidebarHeader.propTypes = {
  username: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired
}
