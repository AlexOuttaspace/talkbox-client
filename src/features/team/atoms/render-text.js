import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import fetch from 'isomorphic-unfetch'

const Root = styled.p`
  border: 1px solid ${(p) => p.theme.gray400};
  background-color: ${(p) => p.theme.gray200};
  color: ${(p) => p.theme.gray700};
  margin: 0.5rem 0 0.2rem;
  padding: 0.5rem;
  font-size: 0.75rem;
  line-height: 1.15rem;
  border-radius: 4px;
`

export class RenderText extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  }

  state = {
    text: ''
  }

  componentDidMount = async () => {
    const { url } = this.props

    const text = await fetch(url).then((res) => res.text())

    return this.setState({ text })
  }

  render() {
    const { text } = this.state

    return <Root>{text}</Root>
  }
}
