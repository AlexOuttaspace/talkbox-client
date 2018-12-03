import React, { Fragment } from 'react'
import { FormattedMessage, defineMessages, intlShape } from 'react-intl'
import styled from 'styled-components'
import { compose } from 'ramda'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { withIntl } from 'src/common'
import { th } from 'src/theme'

export const allPostsQuery = gql`
  query {
    allUsers {
      username
      email
    }
  }
`

const i18n = defineMessages({
  greeting: {
    id: 'dashboard.greeting',
    defaultMessage: 'Hello!'
  }
})

const Greeting = styled.h1`
  color: ${th('secondary')};
`

const allPostsQueryVars = {
  skip: 0,
  first: 10
}

const DashboardPageView = ({ intl }) => {
  return (
    <Fragment>
      <Greeting>{intl.formatMessage(i18n.greeting)}</Greeting>
      <Query query={allPostsQuery} variables={allPostsQueryVars}>
        {({ loading, error, data }) => {
          if (error) return <div>Error occured!</div>
          if (loading) return <div>Loading...</div>

          return <div>Success, {JSON.stringify(data)}</div>
        }}
      </Query>
    </Fragment>
  )
}

DashboardPageView.propTypes = {
  intl: intlShape
}

const enhance = compose(withIntl)

export const DashboardPage = enhance(DashboardPageView)
