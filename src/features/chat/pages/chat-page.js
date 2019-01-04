import React from 'react'

import { Header, Sidebar, Teams } from '../organisms'
import { ChatLayout } from '../templates'

export const ChatPage = () => {
  return (
    <ChatLayout
      sidebarComponent={
        <Sidebar
          teamName="Super science friends"
          username="Stefan Karl"
          channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
          users={[
            { id: 1, name: 'talkboxbot' },
            { id: 2, name: 'Leonard Euler' }
          ]}
        />
      }
      headerComponent={<Header />}
      messagesComponent={<h2>Messages component</h2>}
      teamsComponent={<Teams />}
      inputComponent={<h2>Input component</h2>}
    />
  )
}
