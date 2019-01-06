import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../templates'

const Context = React.createContext()

const Provider = Context.Provider
export const ModalConsumer = Context.Consumer

export class ModalController extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  state = {
    currentModal: ''
  }

  getCurrentModal = () => {
    const { currentModal } = this.state

    if (!currentModal) return null

    switch (currentModal) {
      case 'add-channel':
        return <div>add channel modal</div>
      default:
        return null
    }
  }

  setModalComponentTo = (newModalComponent) =>
    this.setState({ currentModal: newModalComponent })

  render() {
    const { children } = this.props
    const { currentModal } = this.state

    const modalIsOpen = Boolean(currentModal)

    return (
      <Provider value={this.setModalComponentTo}>
        {modalIsOpen && (
          <Modal onClose={() => this.setModalComponentTo('')}>
            {this.getCurrentModal()}
          </Modal>
        )}
        {children}
      </Provider>
    )
  }
}
