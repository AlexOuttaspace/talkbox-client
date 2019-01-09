import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

export const ScrollContainer = ({ children }) => {
  return (
    <Scrollbars
      universal
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
    >
      {children}
    </Scrollbars>
  )
}

ScrollContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
}
