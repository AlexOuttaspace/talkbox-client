import { compose } from 'ramda'

import { withIntl } from './with-intl'
import { withLayout } from './with-layout'
import { withTheme } from './with-theme'
import { withAuth } from './with-auth'

export const pageWithoutLayout = compose(
  withTheme,
  withIntl
)

export const page = compose(
  pageWithoutLayout,
  withLayout
)

export const privatePage = compose(
  page,
  withAuth({ url: '/login' })
)
