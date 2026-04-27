import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { countries } from 'countries-list'
import { useAppDispatch } from '../app/hooks'
import { addCustomer } from '../features/customers/customerSlice'

const initialFormState = {
  name: '',
  email: '',
  countryCode: '+91',
  phone: '',
}

export function CustomerForm() {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState(initialFormState)
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const countryCodes = useMemo(() => {
    const codeList = Object.values(countries)
      .flatMap((country) =>
        country.phone.map((phoneCode) => ({
          code: `+${phoneCode}`,
          label: `${country.name} (+${phoneCode})`,
        })),
      )
      .sort((a, b) => a.label.localeCompare(b.label))

    return codeList
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await dispatch(
      addCustomer({
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode}${formData.phone}`,
      }),
    )
    setFormData(initialFormState)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-sm border border-zinc-400 bg-zinc-100 p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
    >
      <h2 className="text-xl font-semibold">Add Customer</h2>
      <input
        type="text"
        value={formData.name}
        onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
        placeholder="Name"
        className="rounded-sm border border-zinc-400 bg-zinc-50 px-3 py-2 text-zinc-900 outline-none ring-zinc-500 focus:ring-2 placeholder:text-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-400 dark:placeholder:text-zinc-400"
        required
      />
      <input
        type="email"
        value={formData.email}
        onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
        placeholder="Email"
        className="rounded-sm border border-zinc-400 bg-zinc-50 px-3 py-2 text-zinc-900 outline-none ring-zinc-500 focus:ring-2 placeholder:text-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-400 dark:placeholder:text-zinc-400"
        required
      />
      <div className="grid grid-cols-[70px_1fr] gap-2">
        <div
          className="relative"
          tabIndex={0}
          onBlur={() => setIsCountryDropdownOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsCountryDropdownOpen((prev) => !prev)}
            className="w-[70px] rounded-sm border border-zinc-400 bg-zinc-50 px-2 py-2 text-left text-zinc-900 outline-none ring-zinc-500 transition focus:ring-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-400"
            aria-label="Country code"
          >
            {formData.countryCode}
          </button>
          {isCountryDropdownOpen ? (
            <ul className="absolute z-10 mt-1 max-h-48 min-w-[170px] overflow-auto rounded-sm border border-zinc-400 bg-zinc-50 py-1 text-zinc-900 shadow-md dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100">
              {countryCodes.map((country) => (
                <li key={country.code}>
                  <button
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault()
                      setFormData((prev) => ({ ...prev, countryCode: country.code }))
                      setIsCountryDropdownOpen(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm transition hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  >
                    {country.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <input
          type="tel"
          value={formData.phone}
          onChange={(event) =>
            setFormData((prev) => ({
              ...prev,
              phone: event.target.value.replace(/\D/g, ''),
            }))
          }
          placeholder="Phone Number"
          className="rounded-sm border border-zinc-400 bg-zinc-50 px-3 py-2 text-zinc-900 outline-none ring-zinc-500 focus:ring-2 placeholder:text-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-400 dark:placeholder:text-zinc-400"
          required
        />
      </div>
      <button
        type="submit"
        className="rounded-sm border border-zinc-500 bg-zinc-700 px-4 py-2 font-medium text-zinc-100 transition hover:bg-zinc-600 dark:border-zinc-400 dark:bg-zinc-800 dark:hover:bg-zinc-700"
      >
        Submit
      </button>
    </form>
  )
}

