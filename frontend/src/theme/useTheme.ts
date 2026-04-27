import { useEffect } from 'react'

const THEME_KEY = 'customer-dashboard-theme'

export function useTheme() {
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) ?? 'light'
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    localStorage.setItem(THEME_KEY, savedTheme)
  }, [])
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark')
  const nextTheme = isDark ? 'light' : 'dark'
  document.documentElement.classList.toggle('dark', !isDark)
  localStorage.setItem(THEME_KEY, nextTheme)
}

export function getCurrentTheme() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

