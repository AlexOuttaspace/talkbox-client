import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { propShapes } from '../common'
import { Team } from '../atoms'

const Root = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TeamList = ({ teams }) => {
  return (
    <Root>
      {teams.map((team) => (
        <Team key={team.id} team={team} />
      ))}
    </Root>
  )
}

TeamList.propTypes = {
  teams: PropTypes.arrayOf(propShapes.team)
}
