import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cookie from 'cookie'

import { storeToken, removeToken } from 'src/common'

export const getCurrentUser = (context) => {
  const { req } = context

  const { token } = cookie.parse(
    req ? req.headers.cookie || '' : document.cookie
  )

  return token
}

// Context
const CurrentUserContext = React.createContext()

export const CurrentUser = CurrentUserContext.Consumer

export class CurrentUserProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    user: PropTypes.shape({
      token: PropTypes.string
    })
  }

  // eslint-disable-next-line react/sort-comp
  setUser = (user) => {
    this.setState({ user }, storeToken(user.token))
  }

  logoutUser = () => {
    this.setState({ user: { token: '' } }, removeToken())
  }

  state = {
    user: this.props.user,
    setUser: this.setUser
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state}>
        {this.props.children}
      </CurrentUserContext.Provider>
    )
  }
}
