import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.div`
  flex: 1;
`

export const Layout = ({ children }) => (
  <Root>
    <Main>{children}</Main>
  </Root>
)

Layout.propTypes = {
  children: PropTypes.element.isRequired
}
