import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'

import { ModalConsumer } from '../common'

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

export const AddChannelButton = () => {
  return (
    <ModalConsumer>
      {(setModalComponentTo) => (
        <Root
          onClick={(e) => {
            e.target.blur()
            setModalComponentTo('add-channel')
          }}
        >
          <PlusIcon />
        </Root>
      )}
    </ModalConsumer>
  )
}
