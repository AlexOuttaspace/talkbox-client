import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import { Header, Sidebar, Teams, SendMessage, Messages } from '../organisms'
import { TeamLayout } from '../templates'
import { ModalController } from '../common'

import { redirect } from 'src/lib'
import { meQuery } from 'src/services'

export class TeamPage extends Component {
  static propTypes = {
    currentTeamId: PropTypes.number,
    currentMessagesId: PropTypes.number,
    authState: PropTypes.shape({
      token: PropTypes.string.isRequired,
      refreshToken: PropTypes.string.isRequired
    })
  }

  static getInitialProps = async (context) => {
    const { query, apolloClient, apolloExtractData } = context

    const currentTeamId = +query.teamId
    const currentMessagesId = +query.messagesId

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
        const redirectLink = `/team/${redirectTeamId}/${redirectChannelId}`

        return redirect(context, redirectLink)
      }

      const currentChannel = currentTeam.channels.find(
        (channel) => channel.id === currentMessagesId
      )

      if (!currentChannel) {
        const generalChannel = currentTeam.channels.find(
          (channel) => channel.name === 'general'
        )

        return redirect(context, `/team/${currentTeam.id}/${generalChannel.id}`)
      }
    }

    return { currentTeamId, currentMessagesId }
  }

  render() {
    const { currentTeamId, currentMessagesId } = this.props

    return (
      <Query query={meQuery} fetchPolicy="cache-first">
        {({ loading, error, data }) => {
          if (loading) return <div>loading...</div>

          if (error) {
            console.log(error)
            return <div>error...</div>
          }

          if (!data) {
            return <div>error getting data</div>
          }

          const { teams, username, id: userId, admin } = data.me
          console.log(data.me)
          if (teams.length === 0) {
            return (
              // TODO: create a component or redirect here
              <div>You do not have teams yet</div>
            )
          }

          const mappedTeams = teams.map((team) => ({
            id: team.id,
            name: team.name.charAt(0)
          }))

          const currentTeam = teams.find((team) => team.id === currentTeamId)

          const currentChannel = currentTeam.channels.find(
            (channel) => channel.id === currentMessagesId
          )

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
                headerComponent={<Header channelName={currentChannel.name} />}
                messagesComponent={<Messages />}
                teamsComponent={<Teams teams={mappedTeams} />}
                sendMessageComponent={<SendMessage channel={currentChannel} />}
              />
            </ModalController>
          )
        }}
      </Query>
    )
  }
}
