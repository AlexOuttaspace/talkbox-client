import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`

const CloseButton = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
`

export const Modal = ({ children, onClose }) => (
  <Root>
    <CloseButton onClick={onClose}>x</CloseButton>
    {children}
  </Root>
)

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}
