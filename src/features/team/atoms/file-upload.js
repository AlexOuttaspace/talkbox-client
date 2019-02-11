import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

const DefaultRoot = styled.div``

export const FileUpload = ({
  children,
  disableFocus,
  disableClick,
  RootComponent
}) => (
  <Dropzone disableClick={disableClick} onDrop={console.log}>
    {({ getRootProps, getInputProps }) => {
      const inputProps = disableFocus
        ? { hidden: true, type: 'file' }
        : getInputProps()

      return (
        <RootComponent {...getRootProps()} tabIndex={disableFocus ? '-1' : '0'}>
          {children}
          <input type="file" {...inputProps} />
        </RootComponent>
      )
    }}
  </Dropzone>
)

FileUpload.propTypes = {
  children: PropTypes.element.isRequired,
  disableFocus: PropTypes.bool,
  disableClick: PropTypes.bool.isRequired,
  RootComponent: PropTypes.object
}

FileUpload.defaultProps = {
  disableFocus: false,
  disableClick: false,
  RootComponent: DefaultRoot
}
