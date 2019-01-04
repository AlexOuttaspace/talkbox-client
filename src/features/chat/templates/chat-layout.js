import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 80px 220px auto;
  grid-template-rows: 53px auto 80px;
  grid-auto-columns: 1fr;

  > * {
    border: 1px solid red;
  }
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

const InputContainer = styled.div`
  grid-area: 3 / 3 / 4 / 4;
`

export const ChatLayout = ({
  headerComponent,
  sidebarComponent,
  messagesComponent,
  teamsComponent,
  inputComponent
}) => {
  return (
    <Root>
      <TeamsContainer>{teamsComponent}</TeamsContainer>
      <InputContainer>{inputComponent}</InputContainer>
      <HeaderContainer>{headerComponent}</HeaderContainer>
      <SidebarContainer>{sidebarComponent}</SidebarContainer>
      <MessagesContainer>{messagesComponent}</MessagesContainer>
    </Root>
  )
}

ChatLayout.propTypes = {
  headerComponent: PropTypes.element.isRequired,
  sidebarComponent: PropTypes.element.isRequired,
  messagesComponent: PropTypes.element.isRequired,
  teamsComponent: PropTypes.element.isRequired,
  inputComponent: PropTypes.element.isRequired
}
