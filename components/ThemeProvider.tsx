'use client'

import { useEffect } from 'react'
import { useStore } from '@/lib/store'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      <div className="theme-toggle-container">
        <label className="theme-toggle-switch">
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
            aria-label="Tema Değiştir"
          />
          <span className="theme-toggle-slider">
            <span className="theme-toggle-icon theme-toggle-icon-light">
              <i className="fas fa-sun"></i>
            </span>
            <span className="theme-toggle-icon theme-toggle-icon-dark">
              <i className="fas fa-moon"></i>
            </span>
          </span>
        </label>
      </div>
      {children}
    </>
  )
}
