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

import { redirect } from 'src/lib'
import { meQuery, getTeamMembersQuery } from 'src/services'

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

      const {
        me: { teams }
      } = response.data

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

      const {
        data: { getTeamMembers }
      } = await apolloClient.query({
        query: getTeamMembersQuery,
        variables: {
          teamId: currentTeamId
        }
      })

      let messagesReceiver
      if (messageTarget === 'channel') {
        messagesReceiver = currentTeam.channels.find(
          (channel) => channel.id === currentMessagesId
        )
      } else {
        messagesReceiver = getTeamMembers.find(
          (user) => user.id === currentMessagesId
        )
      }

      if (!messagesReceiver) {
        const generalChannel = currentTeam.channels.find(
          (channel) => channel.name === 'general'
        )

        return redirect(
          context,
          `/team/${currentTeam.id}/channel/${generalChannel.id}`
        )
      }
    }

    return { currentTeamId, currentMessagesId, messageTarget }
  }

  render() {
    const { currentTeamId, currentMessagesId, messageTarget } = this.props
    return (
      <Query query={getTeamMembersQuery} variables={{ teamId: currentTeamId }}>
        {({
          loading: loadingOuter,
          error: errorOuter,
          data: { getTeamMembers }
        }) => (
          <Query query={meQuery} fetchPolicy="cache-first">
            {({ loading, error, data }) => {
              if (loading || loadingOuter) return <div>loading...</div>

              if (error || errorOuter) return <div>error...</div>

              const {
                me: { teams, username }
              } = data

              const mappedTeams = teams.map((team) => ({
                id: team.id,
                name: team.name.charAt(0)
              }))

              const currentTeam = teams.find(
                (team) => team.id === currentTeamId
              )

              let sendMessageComponent, pageTitle, messagesComponent

              if (messageTarget === 'channel') {
                const currentChannel = currentTeam.channels.find(
                  (channel) => channel.id === currentMessagesId
                )

                sendMessageComponent = (
                  <SendChannelMessage channel={currentChannel} />
                )
                pageTitle = `#${currentChannel.name}`

                messagesComponent = <ChannelMessages />
              }

              if (messageTarget === 'user') {
                const currentUser = getTeamMembers.find(
                  (user) => user.id === currentMessagesId
                )

                sendMessageComponent = (
                  <SendDirectMessage
                    teamId={currentTeamId}
                    receiver={currentUser}
                  />
                )

                pageTitle = currentUser.username

                messagesComponent = (
                  <DirectMessages receiverId={currentUser.id} />
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
                        users={currentTeam.directMessageMembers}
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
        )}
      </Query>
    )
  }
}
