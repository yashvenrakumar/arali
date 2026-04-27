import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchCustomers } from '../features/customers/customerSlice'
import { CustomerForm } from './CustomerForm'
import { CustomerTable } from './CustomerTable'

export function CustomerDashboard() {
  const dispatch = useAppDispatch()
  const { error, isLoading } = useAppSelector((state) => state.customers)

  useEffect(() => {
    void dispatch(fetchCustomers())
  }, [dispatch])

  return (
    <section className="grid gap-6 md:grid-cols-[320px_1fr]">
      <CustomerForm />
      <div className="space-y-4">
        {isLoading ? (
          <div className="rounded-sm border border-zinc-400 bg-zinc-100 p-4 text-sm text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            Loading...
          </div>
        ) : null}
        {error ? (
          <div className="rounded-sm border border-zinc-500 bg-zinc-200 p-4 text-sm text-zinc-800 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200">
            {error}
          </div>
        ) : null}
        <CustomerTable />
      </div>
    </section>
  )
}

