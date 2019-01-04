import React from 'react'
import styled from 'styled-components'

import { propShapes } from '../common'

const Root = styled.li``

export const User = ({ user }) => {
  return <Root>{user.name}</Root>
}

User.propTypes = {
  user: propShapes.user
}
