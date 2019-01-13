import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { defineMessages, intlShape } from 'react-intl'
import { compose } from 'ramda'
import { withRouter } from 'next/router'

import { propShapes } from '../common'
import { User } from '../atoms'
import { AddDirectMessagesButton } from '../atoms'

import { Link } from 'server/routes'
import { withIntl } from 'src/common'

const i18n = defineMessages({
  users: {
    id: 'chat-page.sidebar.user-list.title',
    defaultMessage: 'Direct messages'
  }
})

const Root = styled.ul`
  list-style-type: none;
  margin-bottom: 18px;
`

const Header = styled.header`
  width: 100%;
  padding: 0 0.75rem 0 1rem;
  height: 26px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.h3`
  font-size: 1rem;
`

export const UserListView = ({ users, intl, router }) => {
  const teamId = +router.query.teamId
  const messagesId = +router.query.messagesId
  const messageTarget = router.query.messageTarget

  return (
    <Root>
      <Header>
        <Title>{intl.formatMessage(i18n.users)}</Title>
        <AddDirectMessagesButton />
      </Header>
      {users.map((user) => (
        <User
          key={user.id}
          selected={messagesId === user.id && messageTarget === 'user'}
          teamId={teamId}
          user={user}
        />
      ))}
    </Root>
  )
}

UserListView.propTypes = {
  intl: intlShape,
  users: PropTypes.arrayOf(propShapes.user),
  router: PropTypes.object.isRequired
}

const enhance = compose(
  withIntl,
  withRouter
)

export const UserList = enhance(UserListView)
