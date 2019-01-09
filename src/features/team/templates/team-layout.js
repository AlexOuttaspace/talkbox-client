import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.div`
  height: 100vh;
  overflow-y: hidden;
  display: grid;
  grid-template-columns: 80px 220px auto;
  grid-template-rows: 53px auto 60px;
  grid-auto-columns: 1fr;
`

const TeamsContainer = styled.div`
  grid-area: 1 / 1 / 4 / 2;
`

const SidebarContainer = styled.div`
  grid-area: 1 / 2 / 4 / 3;
`

const HeaderContainer = styled.div`
  grid-area: 1 / 3 / 2 / 4;
`

const MessagesContainer = styled.div`
  grid-area: 2 / 3 / 3 / 4;
`

const SendMessagesContainer = styled.div`
  grid-area: 3 / 3 / 4 / 4;
`

export const TeamLayout = ({
  headerComponent,
  sidebarComponent,
  messagesComponent,
  teamsComponent,
  sendMessageComponent
}) => {
  return (
    <Root>
      <HeaderContainer>{headerComponent}</HeaderContainer>
      <TeamsContainer>{teamsComponent}</TeamsContainer>
      <SidebarContainer>{sidebarComponent}</SidebarContainer>
      <SendMessagesContainer>{sendMessageComponent}</SendMessagesContainer>
      <MessagesContainer>{messagesComponent}</MessagesContainer>
    </Root>
  )
}

TeamLayout.propTypes = {
  headerComponent: PropTypes.element.isRequired,
  sidebarComponent: PropTypes.element.isRequired,
  messagesComponent: PropTypes.element.isRequired,
  teamsComponent: PropTypes.element.isRequired,
  sendMessageComponent: PropTypes.element.isRequired
}
