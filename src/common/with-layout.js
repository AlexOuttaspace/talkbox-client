import React, { Component } from 'react'

import { hoistHocStatics } from 'src/lib'
import { Layout } from 'src/ui/templates'

export const withLayoutHoc = (W) => {
  class WithLayout extends Component {
    render() {
      return (
        <Layout>
          <W {...this.props} />
        </Layout>
      )
    }
  }

  return WithLayout
}

export const withLayout = hoistHocStatics(withLayoutHoc)
