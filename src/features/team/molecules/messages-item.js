import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

import { MessageMedia } from '../atoms'
import { propShapes } from '../common'

const Root = styled.li`
  padding-left: 1.5rem;
  padding-right: 1.125rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`

const Username = styled.h4`
  font-weight: 700;
`

const Header = styled.header`
  display: flex;
  align-items: center;
`

const Text = styled.p``
const Date = styled.time`
  margin-left: 5px;
  font-size: 0.75rem;
  color: ${(p) => p.theme.gray500};
`

export const MessagesItem = ({ message }) => {
  if (!message.text && !message.url) return null

  const date = dayjs
    .unix(parseInt(message.created_at, 10) / 1000)
    .format('MMM DD HH:mm A')

  return (
    <Root>
      <Header>
        <Username>{message.user.username}</Username>
        <Date>{date}</Date>
      </Header>
      {message.text && <Text>{message.text}</Text>}
      {message.url && (
        <MessageMedia url={message.url} filetype={message.filetype} />
      )}
    </Root>
  )
}

MessagesItem.propTypes = {
  message: propShapes.message
}
