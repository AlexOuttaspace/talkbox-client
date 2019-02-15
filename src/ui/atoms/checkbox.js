import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { CheckmarkIcon } from './checkmark-icon'

const Root = styled.label`
  display: flex;
  align-items: center;
`

const LabelText = styled.span`
  margin-left: 5px;
`

const VisibleCheckbox = styled.div`
  width: 1rem;
  height: 1rem;
  padding: 1px;
  cursor: pointer;
  border: 2px solid ${(p) => p.theme.gray700};

  border-radius: 2px;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    display: none;
  }

  ${(p) =>
    p.checked &&
    `
    svg {
      display: block;
    }
  `}
`

const HiddenInput = styled.input`
  display: none;
`

export const Checkbox = ({
  onChange,
  value,
  labelText,
  className,
  inputProps
}) => (
  <Root className={className}>
    <VisibleCheckbox checked={value}>
      <CheckmarkIcon />
    </VisibleCheckbox>
    <LabelText>{labelText}</LabelText>
    <HiddenInput
      {...inputProps}
      type="checkbox"
      onChange={onChange}
      checked={value}
    />
  </Root>
)

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  labelText: PropTypes.string.isRequired,
  inputProps: PropTypes.object,
  className: PropTypes.string
}
