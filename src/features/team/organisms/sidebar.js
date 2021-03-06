import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { ScrollContainer } from '../templates'
import { propShapes } from '../common'
import { InviteUserButton } from '../atoms'
import { ChannelList, UserList, SidebarHeader } from '../molecules'

const Root = styled.div`
  min-height: 100%;
  background-color: ${(p) => p.theme.purple};
  color: ${(p) => p.theme.purpleWhite};
  overflow: hidden;
`

export const Sidebar = ({ username, teamName, channels, users, isOwner }) => {
  return (
    <ScrollContainer>
      <Root>
        <SidebarHeader username={username} teamName={teamName} />
        <ChannelList channels={channels} isOwner={isOwner} />
        <UserList users={users} />
        {isOwner && <InviteUserButton />}
      </Root>
    </ScrollContainer>
  )
}

Sidebar.propTypes = {
  username: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
  channels: PropTypes.arrayOf(propShapes.channel),
  users: PropTypes.arrayOf(propShapes.user),
  isOwner: PropTypes.bool
}

Sidebar.defaultProps = {
  isOwner: false
}
