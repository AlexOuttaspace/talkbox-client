import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { withRouter } from 'next/router'
import { compose } from 'ramda'

import { AddChatUserItem } from '../atoms'
import { ScrollContainer } from '../templates'

import { Link } from 'server/routes'
import { getTeamMembersQuery } from 'src/services'

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
  padding-left: 1rem;
  padding-bottom: 1rem;
`

export const AddChatUserListView = ({
  currentInputValue,
  router,
  onSelect
}) => {
  const teamId = +router.query.teamId

  return (
    <Query
      query={getTeamMembersQuery}
      variables={{ teamId }}
      fetchPolicy="cache-and-network"
    >
      {({ loading, error, data }) => {
        if (loading) return <div>loading</div>

        if (error) return <div>error</div>

        const usersToShow = data.getTeamMembers.filter((user) =>
          user.username.includes(currentInputValue)
        )

        return (
          <Root>
            <ScrollContainer>
              <List>
                {usersToShow.map((user) => (
                  <Link key={user.id} route={`/team/${teamId}/user/${user.id}`}>
                    <AddChatUserItem onClick={onSelect} user={user} />
                  </Link>
                ))}
              </List>
            </ScrollContainer>
          </Root>
        )
      }}
    </Query>
  )
}

AddChatUserListView.propTypes = {
  currentInputValue: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
}

const enhance = compose(withRouter)

export const AddChatUserList = enhance(AddChatUserListView)
