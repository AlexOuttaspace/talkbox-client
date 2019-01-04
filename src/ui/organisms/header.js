import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

const i18n = defineMessages({
  logo: {
    id: 'base-layout.header.logo',
    defaultMessage: 'Talkbox'
  },
  logout: {
    id: 'base-layout.header.logout',
    defaultMessage: 'Logout'
  }
})

const Root = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
`

const Logo = styled.a`
  text-decoration: none;
  color: ${(p) => p.theme.green};
  font-size: 24px;
  cursor: pointer;
  text-transform: capitalize;

  :active,
  :focus,
  :hover {
    text-decoration: none;
  }
`

export const Header = () => {
  return (
    <Root>
      <Logo>
        <FormattedMessage {...i18n.logo} />
      </Logo>
    </Root>
  )
}
