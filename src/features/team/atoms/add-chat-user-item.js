import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { propShapes } from '../common'

const EnterIcon = styled.img`
  width: 20px;
  opacity: 0;
`

const Root = styled.li`
  border-width: 1px;
  border-style: solid;
  border-color: ${(p) => p.theme.gray200} transparent transparent transparent;
  cursor: pointer;

  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 2rem;
  padding-right: 2rem;
  font-weight: 700;

  :hover {
    background-color: #eaf5fb;
    border: 1px solid #cbe7f7;
    border-radius: 6px;
    ${EnterIcon} {
      opacity: 0.5;
    }
  }
`

export const AddChatUserItem = ({ user, onClick }) => (
  <Root onClick={onClick}>
    {user.username}
    <EnterIcon src="/static/icons/enter.svg" alt="enter key" />
  </Root>
)

AddChatUserItem.propTypes = {
  user: propShapes.user,
  onClick: PropTypes.func.isRequired
}
