import { z } from 'zod'

export const createCustomerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.email('Please provide a valid email address.'),
  phone: z
    .string()
    .min(7, 'Phone number must be at least 7 digits.')
    .max(15, 'Phone number must be at most 15 digits.'),
})

