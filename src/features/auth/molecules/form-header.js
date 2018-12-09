import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(p) => p.theme.gray600};
`

const MainHeader = styled.h2`
  margin-bottom: 2rem;
  font-size: 2rem;
`

const SubHeader = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.1rem;
  text-align: center;
`

export const FormHeader = ({ subHeading, mainHeading }) => (
  <Root>
    <MainHeader>{mainHeading}</MainHeader>
    {subHeading && <SubHeader>{subHeading}</SubHeader>}
  </Root>
)

FormHeader.propTypes = {
  subHeading: PropTypes.string,
  mainHeading: PropTypes.string.isRequired
}
