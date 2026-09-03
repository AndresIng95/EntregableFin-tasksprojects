import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
  } from 'react'
  
  interface ThemeContextValue {
    darkMode: boolean
    toggleDarkMode: () => void
  }
  
  const ThemeContext = createContext<ThemeContextValue | undefined>(
    undefined,
  )
  
  export function ThemeProvider({ children }: { children: ReactNode }) {
    const [darkMode, setDarkMode] = useState(false)
  
    const value = useMemo(
      () => ({
        darkMode,
        toggleDarkMode: () => setDarkMode((current) => !current),
      }),
      [darkMode],
    )
  
    return (
      <ThemeContext.Provider value={value}>
        {children}
      </ThemeContext.Provider>
    )
  }
  
  export function useThemeMode() {
    const context = useContext(ThemeContext)
  
    if (!context) {
      throw new Error(
        'useThemeMode must be used inside ThemeProvider',
      )
    }
  
    return context
  }