import styled from 'styled-components'
import { lighten } from 'polished'

export const SubmitButton = styled.button`
  background-color: ${(p) => p.theme.green};
  color: ${(p) => p.theme.white};
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 0.4rem;

  :hover,
  :focus {
    background-color: ${(p) => lighten(0.05, p.theme.green)};
  }
`
