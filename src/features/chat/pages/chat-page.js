import React from 'react'

import { Header, Sidebar } from '../organisms'
import { ChatLayout } from '../templates'

export const ChatPage = () => {
  return (
    <ChatLayout
      sidebarComponent={<Sidebar />}
      headerComponent={<Header />}
      messagesComponent={<h2>Messages component</h2>}
      teamsComponent={<h2>Teams component</h2>}
      inputComponent={<h2>Input component</h2>}
    />
  )
}
