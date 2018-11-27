import React, { Fragment } from 'react'
import { FormattedMessage, defineMessages, intlShape } from 'react-intl'
import styled from 'styled-components'
import Head from 'next/head'
import { compose } from 'ramda'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { withIntl } from 'src/common'
import { th } from 'src/theme'

export const allPostsQuery = gql`
  query allPosts($first: Int!, $skip: Int!) {
    allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      title
      votes
      url
      createdAt
    }
    _allPostsMeta {
      count
    }
  }
`

const i18n = defineMessages({
  title: {
    id: 'dashboard.title',
    defaultMessage: 'Dashboard'
  },
  greeting: {
    id: 'dashboard.greeting',
    defaultMessage: 'Hello, {name}!'
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
      <Head>
        <title key="title">{intl.formatMessage(i18n.title)}</title>
      </Head>

      <Greeting>
        <FormattedMessage {...i18n.greeting} values={{ name: 'Alex' }} />
      </Greeting>
      <Query query={allPostsQuery} variables={allPostsQueryVars}>
        {({ loading, error, data: { allPosts, _allPostsMeta }, fetchMore }) => {
          if (error) return <div>Error occured!</div>
          if (loading) return <div>Loading...</div>

          return <div>Success, {JSON.stringify(allPosts)}</div>
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
