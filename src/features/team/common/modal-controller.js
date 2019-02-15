import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../templates'
import {
  AddChannelForm,
  InviteUserForm,
  AddDirectMessageChat
} from '../organisms'

const Context = React.createContext()

const Provider = Context.Provider
export const ModalConsumer = Context.Consumer

export class ModalController extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  state = {
    currentModal: 'add-channel'
  }

  closeModal = () => this.setState({ currentModal: '' })

  getModalContents = () => {
    const { currentModal } = this.state

    if (!currentModal) return null

    switch (currentModal) {
      case 'add-channel':
        return <AddChannelForm closeModal={this.closeModal} />
      case 'invite-user':
        return <InviteUserForm closeModal={this.closeModal} />
      case 'add-dm':
        return <AddDirectMessageChat closeModal={this.closeModal} />
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
          <Modal onClose={this.closeModal}>{this.getModalContents()}</Modal>
        )}
        {children}
      </Provider>
    )
  }
}
