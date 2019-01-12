import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

export const ScrollContainer = React.forwardRef(
  ({ children, ...props }, ref) => {
    return (
      <Scrollbars
        ref={ref}
        {...props}
        universal
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
      >
        {children}
      </Scrollbars>
    )
  }
)

ScrollContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
}
