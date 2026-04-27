import { randomUUID } from 'node:crypto'
import { customers } from '../models/customer.model'
import type { CreateCustomerInput, Customer } from '../types/customer.types'
import { AppError } from '../utils/app-error.util'

export class CustomerService {
  static getAllCustomers(): Customer[] {
    return customers
  }

  static createCustomer(input: CreateCustomerInput): Customer {
    const customer: Customer = {
      id: randomUUID(),
      ...input,
    }

    customers.push(customer)
    return customer
  }

  static deleteCustomer(customerId: string): void {
    const customerIndex = customers.findIndex((customer) => customer.id === customerId)
    if (customerIndex === -1) {
      throw new AppError('Customer not found.', 404)
    }

    customers.splice(customerIndex, 1)
  }
}

