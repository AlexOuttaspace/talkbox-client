import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { TeamList } from '../molecules'
import { propShapes } from '../common'

const Root = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(p) => p.theme.darkPurple};
  padding-top: 10px;
`

export const Teams = ({ teams }) => {
  return (
    <Root>
      <TeamList teams={teams} />
    </Root>
  )
}

Teams.propTypes = {
  teams: PropTypes.arrayOf(propShapes.team)
}
