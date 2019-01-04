import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Header } from 'src/ui/organisms'

const Root = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 220px auto;
  grid-template-rows: 53px auto;
  grid-auto-columns: 1fr;
`

const SidebarContainer = styled.div`
  grid-area: 1 / 1 / 3 / 2;
`

const HeaderContainer = styled.div`
  grid-area: 1 / 2 / 2 / 3;
`

const MessagesContainer = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`

export const ChatLayout = ({ sidebarComponent, messagesComponent }) => {
  return (
    <Root>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <SidebarContainer>{sidebarComponent}</SidebarContainer>
      <MessagesContainer>{messagesComponent}</MessagesContainer>
    </Root>
  )
}

ChatLayout.propTypes = {
  sidebarComponent: PropTypes.element.isRequired,
  messagesComponent: PropTypes.element.isRequired
}
