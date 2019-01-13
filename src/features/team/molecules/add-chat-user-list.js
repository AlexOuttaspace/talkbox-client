import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { AddChatUserItem } from '../atoms'
import { ScrollContainer } from '../templates'

const mockUsers = [
  { id: 1, username: 'alex' },
  { id: 2, username: 'sam' },
  { id: 3, username: 'tom' },
  { id: 4, username: 'dave' },
  { id: 5, username: 'tim' },
  { id: 6, username: 'derek' },
  { id: 7, username: 'scott' },
  { id: 8, username: 'alex' },
  { id: 9, username: 'alex' },
  { id: 10, username: 'alex' },
  { id: 11, username: 'alex' }
]

const Root = styled.div`
  width: 95vw;
  max-width: 44rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
  flex-basis: 100%;
  flex-grow: 1;
`

const List = styled.ul`
  list-style-type: none;
  padding-right: 1rem;
  padding-bottom: 1rem;
`

export const AddChatUserList = ({ currentInputValue, setUsername }) => {
  const usersToShow = mockUsers.filter((user) =>
    user.username.includes(currentInputValue)
  )

  return (
    <Root>
      <ScrollContainer>
        <List>
          {usersToShow.map((user) => (
            <AddChatUserItem
              onClick={() => setUsername(user.username)}
              key={user.id}
              user={user}
            />
          ))}
        </List>
      </ScrollContainer>
    </Root>
  )
}

AddChatUserList.propTypes = {
  currentInputValue: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired
}
