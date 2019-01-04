import React from 'react'

import { Header, Sidebar, Teams } from '../organisms'
import { ChatLayout } from '../templates'

export const ChatPage = () => {
  return (
    <ChatLayout
      sidebarComponent={<Sidebar />}
      headerComponent={<Header />}
      messagesComponent={<h2>Messages component</h2>}
      teamsComponent={<Teams />}
      inputComponent={<h2>Input component</h2>}
    />
  )
}
