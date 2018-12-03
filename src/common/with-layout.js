import React, { Component } from 'react'

import { hoistHocStatics } from 'src/lib'
import { BaseLayout } from 'src/ui/templates'

export const withLayoutHoc = (W) => {
  class WithLayout extends Component {
    render() {
      return (
        <BaseLayout>
          <W {...this.props} />
        </BaseLayout>
      )
    }
  }

  return WithLayout
}

export const withLayout = hoistHocStatics(withLayoutHoc)
