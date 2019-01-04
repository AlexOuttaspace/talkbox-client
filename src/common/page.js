import { compose } from 'ramda'

import { withIntl } from './with-intl'
import { withGuestLayout } from './with-guest-layout'
import { withLayout } from './with-layout'
import { withTheme } from './with-theme'
import { withAuth } from './with-auth'

export const pageWithoutLayout = compose(
  withTheme,
  withIntl
)

export const page = compose(
  pageWithoutLayout,
  withGuestLayout
)

export const privatePage = compose(
  withAuth({ url: '/login' }),
  pageWithoutLayout,
  withLayout
)
