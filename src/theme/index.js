import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'
// Colors

// used
export const white = '#fff'

// not yet used
export const gray100 = '#f8f9fa'
export const gray200 = '#e9ecef'
export const gray300 = '#dee2e6'
export const gray400 = '#ced4da'
export const gray500 = '#adb5bd'
export const gray600 = '#6c757d'
export const gray700 = '#495057'
export const gray800 = '#343a40'
export const gray900 = '#212529'
export const black = '#000'

// used
export const green = '#008952'
export const red = '#d72b3f'

// not yet used
export const blue = '#007bff'
export const indigo = '#6610f2'
export const purple = '#6f42c1'
export const pink = '#e83e8c'
export const brick = '#bd4932'
export const orange = '#fd7e14'
export const yellow = '#ffc107'
export const teal = '#20c997'
export const cyan = '#17a2b8'

export const primary = brick
export const secondary = gray600
export const success = green
export const info = cyan
export const warning = yellow
export const danger = red
export const light = gray100
export const dark = gray800

export const GlobalStyles = createGlobalStyle`
  ${styledNormalize}

  * {
    outline: none;
    :focus {
      box-shadow: 0 0 2px 1px ${green};
    }
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
  }
`
