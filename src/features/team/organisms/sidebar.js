import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { propShapes } from '../common'
import { InviteUserButton } from '../atoms'
import { ChannelList, UserList, SidebarHeader } from '../molecules'

const Root = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(p) => p.theme.purple};
  color: ${(p) => p.theme.purpleWhite};
`

export const Sidebar = ({ username, teamName, channels, users, isOwner }) => {
  return (
    <Root>
      <SidebarHeader username={username} teamName={teamName} />
      <ChannelList channels={channels} isOwner={isOwner} />
      <UserList users={users} />
      {isOwner && <InviteUserButton />}
    </Root>
  )
}

Sidebar.propTypes = {
  username: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
  channels: PropTypes.arrayOf(propShapes.channel),
  users: PropTypes.arrayOf(propShapes.user),
  isOwner: PropTypes.bool.isRequired
}
