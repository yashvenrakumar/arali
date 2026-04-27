import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  }

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Keep diagnostics for debugging in development tools.
    // eslint-disable-next-line no-console
    console.error('Unhandled UI error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-zinc-200 px-4 py-8 text-zinc-900 dark:bg-black dark:text-zinc-100">
          <div className="mx-auto max-w-xl rounded-sm border border-zinc-400 bg-zinc-100 p-6 dark:border-zinc-700 dark:bg-zinc-900">
            <h1 className="text-2xl font-semibold">Something went wrong</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              An unexpected error occurred. Please refresh the page and try again.
            </p>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

