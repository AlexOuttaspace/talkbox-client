import React from 'react'
import styled from 'styled-components'

import { propShapes } from '../common'

const Root = styled.li``

export const Team = ({ team }) => {
  return <Root>{team.name}</Root>
}

Team.propTypes = {
  team: propShapes.team
}
