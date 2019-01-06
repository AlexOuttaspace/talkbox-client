import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import decode from 'jwt-decode'
import { isEmpty } from 'ramda'

import { Header, Sidebar, Teams, SendMessage } from '../organisms'
import { TeamLayout } from '../templates'

import { Router } from 'server/routes'
import { getTokens } from 'src/common'
import { allTeamsQuery } from 'src/services'

export class TeamPage extends Component {
  static propTypes = {
    currentTeamId: PropTypes.number.isRequired
  }

  static getInitialProps = async (context) => {
    const currentTeamId = +context.query.teamId

    return { currentTeamId }
  }

  render() {
    const { currentTeamId } = this.props

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
                console.log('error extracting token')
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

              const teams = allTeams.map((team) => ({
                id: team.id,
                name: team.name.charAt(0)
              }))

              const currentTeam =
                allTeams.find((team) => team.id === currentTeamId) || {}

              // this is a hacky way to handle invalid team id's in url
              // TODO: figure out a way to do this on server, not on client
              if (isEmpty(currentTeam) && process.browser) {
                Router.pushRoute(`/team/${allTeams[0].id}`)
              }

              return (
                <TeamLayout
                  sidebarComponent={
                    <Sidebar
                      teamName={currentTeam.name || ''}
                      username={username}
                      channels={[
                        { id: 1, name: 'general' },
                        { id: 2, name: 'random' }
                      ]}
                      users={[
                        { id: 1, name: 'talkboxbot' },
                        { id: 2, name: 'Leonard Euler' }
                      ]}
                    />
                  }
                  headerComponent={<Header channelName="russia not today" />}
                  messagesComponent={<div />}
                  teamsComponent={<Teams teams={teams} />}
                  sendMessageComponent={
                    <SendMessage channelName="Russia not today" />
                  }
                />
              )
            }}
          </Query>
        )}
      </Query>
    )
  }
}
