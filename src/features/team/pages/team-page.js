import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import decode from 'jwt-decode'

import { Header, Sidebar, Teams, SendMessage } from '../organisms'
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

    if (!apolloExtractData) {
      const response = await apolloClient.query({
        query: allTeamsQuery
      })

      const { allTeams } = response.data

      const userHasNoTeams = allTeams.length === 0
      if (userHasNoTeams) {
        return redirect(context, '/create-team')
      }

      const currentTeam = allTeams.find((team) => team.id === currentTeamId)
      if (!currentTeam) {
        const redirectTeamId = allTeams[0].id
        const redirectChannelId = allTeams[0].channels[0].id
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

          const { allTeams } = data

          let username = ''
          try {
            const { user } = decode(refreshToken)
            username = user.username
          } catch (error) {
            console.log(error)
          }

          const teams = allTeams.map((team) => ({
            id: team.id,
            name: team.name.charAt(0)
          }))

          const currentTeam = allTeams.find((team) => team.id === currentTeamId)

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
                    users={[
                      { id: 1, name: 'talkboxbot' },
                      { id: 2, name: 'Leonard Euler' }
                    ]}
                  />
                }
                headerComponent={<Header channelName={currentChannel.name} />}
                messagesComponent={<div />}
                teamsComponent={<Teams teams={teams} />}
                sendMessageComponent={
                  <SendMessage channelName={currentChannel.name} />
                }
              />
            </ModalController>
          )
        }}
      </Query>
    )
  }
}
