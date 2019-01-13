import React from 'react'
import PropTypes from 'prop-types'

export const AddChatUserList = ({ currentInputValue }) => {
  return <div>{currentInputValue}</div>
}

AddChatUserList.propTypes = {
  currentInputValue: PropTypes.string.isRequired
}
