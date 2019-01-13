import React from 'react'

import { ModalConsumer } from '../common'

import { PlusButton } from './plus-button'

export const AddDirectMessagesButton = () => {
  return (
    <ModalConsumer>
      {(setModalComponentTo) => (
        <PlusButton
          onClick={(e) => {
            e.target.blur()
            setModalComponentTo('add-dm')
          }}
        />
      )}
    </ModalConsumer>
  )
}
