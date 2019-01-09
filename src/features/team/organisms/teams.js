import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { TeamList } from '../molecules'
import { propShapes } from '../common'
import { ScrollContainer } from '../templates'

const Root = styled.div`
  min-height: 100%;
  background-color: ${(p) => p.theme.darkPurple};
  padding-top: 10px;
  overflow: hidden;
`

export const Teams = ({ teams }) => {
  return (
    <ScrollContainer>
      <Root>
        <TeamList teams={teams} />
      </Root>
    </ScrollContainer>
  )
}

Teams.propTypes = {
  teams: PropTypes.arrayOf(propShapes.team)
}
