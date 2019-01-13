import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { lighten } from 'polished'

import { PlusIcon } from 'src/ui/atoms'

const Root = styled.button`
  border: none;
  background: none;
  display: block;
  align-items: center;
  justify-content: center;
  padding: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  border-radius: 50%;

  :hover svg {
    fill: ${(p) => lighten(0.7, p.theme.purpleWhite)};
  }

  svg {
    transition: fill 0.1s;
    fill: ${(p) => p.theme.purpleWhite};
  }
`

export const PlusButton = ({ onClick }) => {
  return (
    <Root onClick={onClick}>
      <PlusIcon />
    </Root>
  )
}

PlusButton.propTypes = {
  onClick: PropTypes.func.isRequired
}
