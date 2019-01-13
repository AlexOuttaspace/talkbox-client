import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { propShapes } from '../common'

const Root = styled.li`
  border-width: 1px;
  border-style: solid;
  border-color: ${(p) => p.theme.gray200} transparent transparent transparent;
  cursor: pointer;

  height: 4rem;
  display: flex;
  align-items: center;
  padding-left: 2rem;
  font-weight: 700;

  :hover {
    background-color: #eaf5fb;
    border: 1px solid #cbe7f7;
    border-radius: 6px;
  }
`

export const AddChatUserItem = ({ user, onClick }) => (
  <Root onClick={onClick}>{user.username}</Root>
)

AddChatUserItem.propTypes = {
  user: propShapes.user,
  onClick: PropTypes.func.isRequired
}
