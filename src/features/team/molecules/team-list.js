import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import { compose } from 'ramda'

import { propShapes } from '../common'
import { Team } from '../atoms'

const Root = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TeamListView = ({ teams, router }) => {
  const currentTeamId = +router.query.teamId
  const messagesId = +router.query.messagesId
  return (
    <Root>
      {teams.map((team) => (
        <Team
          messagesId={messagesId}
          isCurrent={currentTeamId === team.id}
          key={team.id}
          team={team}
        />
      ))}
    </Root>
  )
}

TeamListView.propTypes = {
  teams: PropTypes.arrayOf(propShapes.team),
  router: PropTypes.object.isRequired
}

const enhance = compose(withRouter)

export const TeamList = enhance(TeamListView)
