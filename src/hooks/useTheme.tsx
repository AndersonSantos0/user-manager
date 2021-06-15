import { createContext, useContext, useEffect, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { dark, light } from '../styles/theme'

interface ThemeContextProps {
  theme?: 'dark' | 'light'
  switchTheme: (theme?: 'dark' | 'light') => void
}

const ThemeContext = createContext({} as ThemeContextProps)

export const useTheme = () => useContext(ThemeContext)

interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    setTheme(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light')
  }, [])

  const switchTheme = (theme?: 'dark' | 'light') => {
    if (theme) {
      localStorage.setItem('theme', theme)
      setTheme(theme)
    }
    const local = localStorage.getItem('theme')
    localStorage.setItem('theme', local === 'dark' ? 'light' : 'dark')
    setTheme(local === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ switchTheme, theme }}>
      <StyledThemeProvider theme={theme === 'dark' ? dark : light}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
