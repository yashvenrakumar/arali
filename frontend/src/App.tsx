import { CustomerDashboard } from './components/CustomerDashboard'
import { ThemeToggle } from './theme/ThemeToggle'
import { useTheme } from './theme/useTheme'

function App() {
  useTheme()

  return (
    <main className="min-h-screen bg-zinc-200 px-4 py-8 text-zinc-900 transition-colors duration-200 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold md:text-3xl">Customer Dashboard</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Add, view, and delete customer records.
            </p>
          </div>
          <ThemeToggle />
        </header>
        <CustomerDashboard />
      </div>
    </main>
  )
}

export default App
