import React, { Component } from 'react'

import { hoistHocStatics } from 'src/lib'
import { GuestLayout } from 'src/ui/templates'

export const withGuestLayoutHoc = (W) => {
  class WithGuestLayout extends Component {
    render() {
      return (
        <GuestLayout>
          <W {...this.props} />
        </GuestLayout>
      )
    }
  }

  return WithGuestLayout
}

export const withGuestLayout = hoistHocStatics(withGuestLayoutHoc)
