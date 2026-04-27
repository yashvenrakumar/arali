import { useState } from 'react'
import { getCurrentTheme, toggleTheme } from './useTheme'

export function ThemeToggle() {
  const [theme, setTheme] = useState(getCurrentTheme())

  const onToggleTheme = () => {
    toggleTheme()
    setTheme(getCurrentTheme())
  }

  return (
    <button
      type="button"
      onClick={onToggleTheme}
      className="rounded-sm border border-zinc-500 bg-zinc-700 px-3 py-2 text-sm font-medium text-zinc-100 transition hover:bg-zinc-600 dark:border-zinc-400 dark:bg-zinc-800 dark:hover:bg-zinc-700"
    >
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}

