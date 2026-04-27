import { useAppDispatch, useAppSelector } from '../app/hooks'
import { removeCustomer } from '../features/customers/customerSlice'

export function CustomerTable() {
  const dispatch = useAppDispatch()
  const { customers } = useAppSelector((state) => state.customers)

  if (customers.length === 0) {
    return (
      <div className="rounded-sm border border-zinc-400 bg-zinc-100 p-6 text-sm text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
        No customers added yet.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-sm border border-zinc-400 bg-zinc-100 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <table className="min-w-full divide-y divide-zinc-400 dark:divide-zinc-700">
        <thead className="bg-zinc-300 dark:bg-zinc-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Email
            </th>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Phone
            </th>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-400 text-zinc-900 dark:divide-zinc-700 dark:text-zinc-100">
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="transition-colors hover:bg-zinc-200/70 dark:hover:bg-zinc-800/70"
            >
              <td className="px-4 py-3">{customer.name}</td>
              <td className="px-4 py-3">{customer.email}</td>
              <td className="px-4 py-3">{customer.phone}</td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => void dispatch(removeCustomer(customer.id))}
                  className="rounded-sm border border-zinc-500 bg-zinc-700 px-3 py-1 text-sm text-zinc-100 transition hover:bg-zinc-600 dark:border-zinc-400 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

