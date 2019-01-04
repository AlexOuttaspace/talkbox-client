import React from 'react'

import { Sidebar } from '../organisms'
import { ChatLayout } from '../templates'

export const ChatPage = () => {
  return (
    <ChatLayout
      sidebarComponent={<Sidebar />}
      messagesComponent={<h2>Messages component</h2>}
    />
  )
}
