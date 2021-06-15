import 'styled-components'

export type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primaryColor: string
      secondaryColor: string
      background: string
      container: string
      accentColor: string
      borderColor: string
      textTitle: string
      text: string
      description: string
      placeholder: string
    }
  }
}
