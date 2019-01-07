import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import decode from 'jwt-decode'
import { isEmpty } from 'ramda'

import { Header, Sidebar, Teams, SendMessage } from '../organisms'
import { TeamLayout } from '../templates'
import { ModalController } from '../common'

import { Router } from 'server/routes'
import { getTokens } from 'src/common'
import { allTeamsQuery } from 'src/services'

export class TeamPage extends Component {
  static propTypes = {
    currentTeamId: PropTypes.number,
    currentMessagesId: PropTypes.number
  }

  static getInitialProps = async ({ query }) => {
    const currentTeamId = +query.teamId
    const currentMessagesId = +query.messagesId

    return { currentTeamId, currentMessagesId }
  }

  render() {
    const { currentTeamId, currentMessagesId } = this.props

    return (
      <Query query={getTokens}>
        {({
          data: {
            authState: { refreshToken }
          }
        }) => (
          <Query query={allTeamsQuery}>
            {({ loading, error, data: { allTeams } }) => {
              if (!refreshToken) {
                console.log('error extracting token in TeamPage')
                return null
              }

              if (loading) return <div>loading...</div>

              if (error) {
                console.log(error)
                return <div>error...</div>
              }

              let username = ''
              try {
                const { user } = decode(refreshToken)
                username = user.username
              } catch (error) {
                console.log(error)
              }

              console.log(allTeams)

              const teams = allTeams.map((team) => ({
                id: team.id,
                name: team.name.charAt(0)
              }))

              const currentTeam =
                allTeams.find((team) => team.id === currentTeamId) || {}

              // from this line to line 95 is a hacky way
              // to handle invalid team/messages ids in the url
              // TODO: figure out a way to do this on server, not on client
              if (isEmpty(currentTeam)) {
                if (process.browser) {
                  const redirectTeamId = allTeams[0].id
                  const redirectChannelId = allTeams[0].channels[0].id
                  const redirectLink = `/team/${redirectTeamId}/${redirectChannelId}`

                  Router.pushRoute(redirectLink)
                }
                return null
              }

              const currentChannel =
                currentTeam.channels.find(
                  (channel) => channel.id === currentMessagesId
                ) || {}

              if (isEmpty(currentChannel)) {
                if (process.browser) {
                  const generalChannel = currentTeam.channels.find(
                    (channel) => channel.name === 'general'
                  )

                  Router.pushRoute(
                    `/team/${currentTeam.id}/${generalChannel.id}`
                  )
                }

                return null
              }

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
                    headerComponent={
                      <Header channelName={currentChannel.name} />
                    }
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
        )}
      </Query>
    )
  }
}
