import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

export const FileUpload = ({ children }) => (
  <Dropzone onDrop={() => {}}>
    {({ getRootProps, getInputProps }) => {
      const updateChildren = React.cloneElement(children, { ...getRootProps() })

      return (
        <Fragment>
          {updateChildren}
          <input type="file" {...getInputProps()} />
        </Fragment>
      )
    }}
  </Dropzone>
)

FileUpload.propTypes = {
  children: PropTypes.element.isRequired
}
