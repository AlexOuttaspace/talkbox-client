import React from 'react'

import { Header, Sidebar, Teams, SendMessage } from '../organisms'
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
      headerComponent={<Header channelName="russia not today" />}
      messagesComponent={<h2>Messages component</h2>}
      teamsComponent={
        <Teams teams={[{ id: 1, name: 'S' }, { id: 2, name: 'O' }]} />
      }
      sendMessageComponent={<SendMessage channelName="Russia not today" />}
    />
  )
}
