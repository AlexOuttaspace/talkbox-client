import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Link } from 'server/routes'

const Root = styled.nav`
  font-size: 1rem;
  color: ${(p) => p.theme.gray700};
`

const LinkInner = styled.a`
  text-decoration: underline;
  color: inherit;

  :active,
  :focus,
  :visited {
    color: inherit;
  }
`

export const AuthSwitch = ({ title, textInsideLink, route }) => (
  <Root>
    <span>{title}</span>
    <Link route={route}>
      <LinkInner href={route}>{textInsideLink}</LinkInner>
    </Link>
  </Root>
)

AuthSwitch.propTypes = {
  title: PropTypes.string.isRequired,
  textInsideLink: PropTypes.string.isRequired,
  route: PropTypes.oneOf(['login', 'register']).isRequired
}
