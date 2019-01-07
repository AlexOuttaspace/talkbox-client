import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ModalCloseButton } from 'src/ui/molecules'

const Root = styled.div`
  background-color: ${(p) => p.theme.white};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Modal = ({ children, onClose }) => (
  <Root>
    <ModalCloseButton onClick={onClose} />
    {children}
  </Root>
)

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}
