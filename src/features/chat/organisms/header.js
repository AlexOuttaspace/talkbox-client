import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
`

const Logo = styled.h2`
  text-decoration: none;
  color: ${(p) => p.theme.gray800};
  font-size: 1.125rem;
  cursor: pointer;
  text-transform: capitalize;

  :active,
  :focus,
  :hover {
    text-decoration: none;
  }
`

export const Header = ({ channelName }) => {
  return (
    <Root>
      <Logo># {channelName}</Logo>
    </Root>
  )
}

Header.propTypes = {
  channelName: PropTypes.string.isRequired
}
