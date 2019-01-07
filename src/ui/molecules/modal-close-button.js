import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { CloseIcon } from 'src/ui/atoms'

const Esc = styled.span`
  margin-top: 3px;
  font-size: 14px;

  color: ${(p) => p.theme.gray600};
`

const IconWrapper = styled.div`
  height: 20px;
  width: 20px;
  margin-top: 5px;

  svg {
    fill: ${(p) => p.theme.gray600};
  }
`

const Root = styled.button`
  position: absolute;
  right: 40px;
  top: 60px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  border-radius: 50%;
  padding: 14px;
  height: 64px;
  width: 64px;
  padding-top: 12px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  :hover,
  :focus {
    background-color: ${(p) => p.theme.gray200};
  }

  :active {
    ${IconWrapper} svg {
      fill: ${(p) => p.theme.white};
    }
    ${Esc} {
      color: ${(p) => p.theme.white};
    }
    background-color: ${(p) => p.theme.green};
  }
`

export const ModalCloseButton = ({ onClick }) => {
  return (
    <Root onClick={onClick}>
      <IconWrapper>
        <CloseIcon />
      </IconWrapper>
      <Esc>esc</Esc>
    </Root>
  )
}

ModalCloseButton.propTypes = {
  onClick: PropTypes.func.isRequired
}
