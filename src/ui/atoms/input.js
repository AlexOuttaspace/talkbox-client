import styled from 'styled-components'

export const Input = styled.input`
  border: 1px solid ${(p) => p.theme.gray200};
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 6px;

  :focus {
    border-color: ${(p) => p.theme.green};
  }
`
