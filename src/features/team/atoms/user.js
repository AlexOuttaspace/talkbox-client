import React from 'react'
import styled from 'styled-components'

import { propShapes } from '../common'

const Root = styled.li`
  width: 100%;
  height: 26px;

  display: flex;
  align-items: center;

  padding: 0 0.75rem 0 1rem;

  font-size: 1rem;

  cursor: pointer;
  :hover {
    background-color: ${(p) => p.theme.purpleHover};
  }

  :before {
    content: '';
    width: 10px;
    height: 10px;
    background-color: ${(p) => p.theme.green};
    border-radius: 50%;
    margin-right: 6px;
  }
`

export const User = ({ user }) => {
  return <Root>{user.username}</Root>
}

User.propTypes = {
  user: propShapes.user
}
