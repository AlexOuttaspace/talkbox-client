import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { propShapes } from '../common'
import { User } from '../atoms'

const Root = styled.ul`
  list-style-type: none;
`

export const UserList = ({ users }) => {
  return (
    <Root>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </Root>
  )
}

UserList.propTypes = {
  users: PropTypes.arrayOf(propShapes.user)
}
