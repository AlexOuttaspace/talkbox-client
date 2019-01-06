import React from 'react'
import { Query } from 'react-apollo'
import decode from 'jwt-decode'

import { Header, Sidebar, Teams, SendMessage } from '../organisms'
import { TeamLayout } from '../templates'

import { getTokens } from 'src/common'
import { allTeamsQuery } from 'src/services'

export const TeamPage = () => {
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

            console.log(allTeams)

            console.log(refreshToken)

            let username = ''
            try {
              const { user } = decode(refreshToken)
              username = user.username
            } catch (error) {
              console.log(error)
            }

            const currentTeamId = 1 // TODO: extract this from url

            const teams = allTeams.map((team) => ({
              id: team.id,
              name: team.name.charAt(0)
            }))

            const currentTeam = allTeams.find(
              (team) => team.id === currentTeamId
            )

            return (
              <TeamLayout
                sidebarComponent={
                  <Sidebar
                    teamName="Super science friends"
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
