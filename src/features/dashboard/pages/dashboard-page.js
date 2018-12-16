import React, { Fragment } from 'react'
import { defineMessages, intlShape } from 'react-intl'
import styled from 'styled-components'
import { compose } from 'ramda'
import { Query } from 'react-apollo'

import { withIntl, getTokens } from 'src/common'

const i18n = defineMessages({
  greeting: {
    id: 'dashboard.greeting',
    defaultMessage: 'Hello!'
  }
})

const Greeting = styled.h1`
  color: ${(p) => p.theme.secondary};
`

const DashboardPageView = ({ intl }) => {
  return (
    <Fragment>
      <Greeting>{intl.formatMessage(i18n.greeting)}</Greeting>
      <Query query={getTokens}>
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
