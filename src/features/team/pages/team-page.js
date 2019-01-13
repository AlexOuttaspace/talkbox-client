import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import {
  Header,
  Sidebar,
  Teams,
  SendChannelMessage,
  SendDirectMessage,
  ChannelMessages,
  DirectMessages
} from '../organisms'
import { TeamLayout } from '../templates'
import { ModalController } from '../common'
import { message } from '../common/prop-shapes'

import { redirect } from 'src/lib'
import { meQuery } from 'src/services'

export class TeamPage extends Component {
  static propTypes = {
    currentTeamId: PropTypes.number,
    currentMessagesId: PropTypes.number,
    messageTarget: PropTypes.oneOf(['user', 'channel'])
  }

  static getInitialProps = async (context) => {
    const { query, apolloClient, apolloExtractData } = context

    const currentTeamId = +query.teamId
    const currentMessagesId = +query.messagesId
    const messageTarget = query.messageTarget
    /*
      we need to use this if-statement because
      if we execute redirect while running getDataFromTree it
      will call res.end() which will lead to the following error on the second run:
      Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    */
    if (!apolloExtractData) {
      const response = await apolloClient.query({
        query: meQuery
      })

      const { teams } = response.data.me

      const userHasNoTeams = teams.length === 0
      if (userHasNoTeams) {
        return redirect(context, '/create-team')
      }

      const currentTeam = teams.find((team) => team.id === currentTeamId)
      if (!currentTeam) {
        const redirectTeamId = teams[0].id
        const redirectChannelId = teams[0].channels[0].id
        const redirectLink = `/team/${redirectTeamId}/channel/${redirectChannelId}`

        return redirect(context, redirectLink)
      }

      if (messageTarget === 'channel') {
        const currentChannel = currentTeam.channels.find(
          (channel) => channel.id === currentMessagesId
        )

        if (!currentChannel) {
          const generalChannel = currentTeam.channels.find(
            (channel) => channel.name === 'general'
          )

          return redirect(
            context,
            `/team/${currentTeam.id}/channel/${generalChannel.id}`
          )
        }
      }
    }

    return { currentTeamId, currentMessagesId, messageTarget }
  }

  render() {
    const { currentTeamId, currentMessagesId, messageTarget } = this.props
    return (
      <Query query={meQuery} fetchPolicy="cache-first">
        {({ loading, error, data }) => {
          if (loading) return <div>loading...</div>

          if (error) return <div>error...</div>
          console.log(data)

          const { teams, username } = data.me

          console.log('Current user ID:', data.me.id)

          const mappedTeams = teams.map((team) => ({
            id: team.id,
            name: team.name.charAt(0)
          }))

          const currentTeam = teams.find((team) => team.id === currentTeamId)

          const currentChannel = currentTeam.channels.find(
            (channel) => channel.id === currentMessagesId
          )

          let sendMessageComponent, pageTitle, messagesComponent

          if (messageTarget === 'channel') {
            sendMessageComponent = (
              <SendChannelMessage channel={currentChannel} />
            )
            pageTitle = `#${currentChannel.name}`

            messagesComponent = <ChannelMessages />
          }

          if (messageTarget === 'user') {
            sendMessageComponent = (
              <SendDirectMessage
                teamId={currentTeamId}
                receiverId={currentMessagesId}
              />
            )

            pageTitle = `username`

            messagesComponent = (
              <DirectMessages receiverId={currentMessagesId} />
            )
          }

          return (
            <ModalController>
              <TeamLayout
                sidebarComponent={
                  <Sidebar
                    teamName={currentTeam.name || ''}
                    username={username}
                    channels={currentTeam.channels}
                    isOwner={currentTeam.admin}
                    users={[
                      { id: 1, name: 'talkboxbot' },
                      { id: 2, name: 'Leonard Euler' }
                    ]}
                  />
                }
                sendMessageComponent={sendMessageComponent}
                messagesComponent={messagesComponent}
                headerComponent={<Header title={pageTitle} />}
                teamsComponent={<Teams teams={mappedTeams} />}
              />
            </ModalController>
          )
        }}
      </Query>
    )
  }
}
