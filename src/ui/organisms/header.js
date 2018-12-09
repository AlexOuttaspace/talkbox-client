import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

const i18n = defineMessages({
  logo: {
    id: 'base-layout.header.logo',
    defaultMessage: 'LOGO'
  },
  logout: {
    id: 'base-layout.header.logout',
    defaultMessage: 'Logout'
  }
})

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.a`
  text-decoration: none;
  color: ${(p) => p.theme.primary};
  font-size: 24px;

  :active,
  :focus,
  :hover {
    text-decoration: none;
    color: ${(p) => p.theme.primary};
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
