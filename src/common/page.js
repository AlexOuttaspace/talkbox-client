import { compose } from 'ramda'

import { withIntl } from './with-intl'
import { withLayout } from './with-layout'
import { withTheme } from './with-theme'

export const pageWithoutLayout = compose(
  withTheme,
  withIntl
)

export const page = compose(
  pageWithoutLayout,
  withLayout
)
