import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(p) => p.theme.purple};
`

export const Sidebar = () => {
  return <Root>Sidebar</Root>
}
