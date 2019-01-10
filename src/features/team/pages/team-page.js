import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import decode from 'jwt-decode'

import { Header, Sidebar, Teams, SendMessage, Messages } from '../organisms'
import { TeamLayout } from '../templates'
import { ModalController } from '../common'

import { redirect } from 'src/lib'
import { getTokens } from 'src/common'
import { allTeamsQuery } from 'src/services'

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
        query: allTeamsQuery
      })

      const { allTeams, inviteTeams } = response.data

      const teamsArray = [...allTeams, ...inviteTeams]

      const userHasNoTeams = teamsArray.length === 0
      if (userHasNoTeams) {
        return redirect(context, '/create-team')
      }

      const currentTeam = teamsArray.find((team) => team.id === currentTeamId)
      if (!currentTeam) {
        const redirectTeamId = teamsArray[0].id
        const redirectChannelId = teamsArray[0].channels[0].id
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

    const { authState } = apolloClient.cache.readQuery({ query: getTokens })

    return { currentTeamId, currentMessagesId, authState }
  }

  render() {
    const {
      currentTeamId,
      currentMessagesId,
      authState: { refreshToken }
    } = this.props

    return (
      <Query query={allTeamsQuery}>
        {({ loading, error, data }) => {
          if (loading) return <div>loading...</div>

          if (error) {
            console.log(error)
            return <div>error...</div>
          }

          if (!data) {
            return <div>error getting data</div>
          }

          const { allTeams, inviteTeams } = data

          const teamsArray = [...allTeams, ...inviteTeams]

          if (teamsArray.length === 0) {
            return (
              // TODO: create a component or redirect here
              <div>You do not have teams yet</div>
            )
          }

          let user
          try {
            const decoded = decode(refreshToken)
            user = decoded.user
          } catch (error) {
            console.log(error)
          }

          const teams = teamsArray.map((team) => ({
            id: team.id,
            name: team.name.charAt(0)
          }))

          const currentTeam = teamsArray.find(
            (team) => team.id === currentTeamId
          )

          const currentChannel = currentTeam.channels.find(
            (channel) => channel.id === currentMessagesId
          )

          return (
            <ModalController>
              <TeamLayout
                sidebarComponent={
                  <Sidebar
                    teamName={currentTeam.name || ''}
                    username={user.username}
                    channels={currentTeam.channels}
                    isOwner={currentTeam.owner === user.id}
                    users={[
                      { id: 1, name: 'talkboxbot' },
                      { id: 2, name: 'Leonard Euler' }
                    ]}
                  />
                }
                headerComponent={<Header channelName={currentChannel.name} />}
                messagesComponent={<Messages />}
                teamsComponent={<Teams teams={teams} />}
                sendMessageComponent={<SendMessage channel={currentChannel} />}
              />
            </ModalController>
          )
        }}
      </Query>
    )
  }
}
