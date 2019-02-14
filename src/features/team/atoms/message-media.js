import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { RenderText } from './render-text'

const Image = styled.img.attrs({ alt: 'image inside a message' })`
  width: 100%;
  max-width: 400px;
  margin-top: 0.25rem;
`

export const MessageMedia = ({ url, filetype }) => {
  if (filetype.startsWith('image/')) {
    return <Image src={url} alt="Attached image" />
  }

  if (filetype === 'text/plain') {
    return <RenderText url={url} />
  }

  if (filetype.startsWith('audio/')) {
    return (
      <audio controls>
        <source src={url} filetype={url} />
      </audio>
    )
  }

  return null
}

MessageMedia.propTypes = {
  url: PropTypes.string.isRequired,
  filetype: PropTypes.string.isRequired
}
