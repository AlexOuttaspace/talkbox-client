import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import { graphql } from 'react-apollo'
import { compose } from 'ramda'
import { withRouter } from 'next/router'

import { createMessageMutation } from 'src/services'

const DefaultRoot = styled.div``

const FileUploadView = ({
  children,
  disableFocus,
  disableClick,
  RootComponent,
  mutate,
  router
}) => (
  <Dropzone
    disableClick={disableClick}
    onDrop={async (file) => {
      const channelId = +router.query.messagesId
      const response = await mutate({ variables: { file, channelId } })
      console.log(response)
    }}
  >
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

FileUploadView.propTypes = {
  children: PropTypes.element.isRequired,
  disableFocus: PropTypes.bool,
  disableClick: PropTypes.bool,
  RootComponent: PropTypes.object,
  router: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired
}

FileUploadView.defaultProps = {
  disableFocus: false,
  disableClick: false,
  RootComponent: DefaultRoot
}

const enhance = compose(
  withRouter,
  graphql(createMessageMutation)
)

export const FileUpload = enhance(FileUploadView)
