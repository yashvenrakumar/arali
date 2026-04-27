import type { Request, Response } from 'express'
import { CustomerService } from '../services/customer.service'
import { successResponse } from '../utils/response.util'

export class CustomerController {
  static getCustomers(_request: Request, response: Response) {
    const customers = CustomerService.getAllCustomers()
    return response.status(200).json(successResponse('Customers fetched successfully.', customers))
  }

  static createCustomer(request: Request, response: Response) {
    const createdCustomer = CustomerService.createCustomer(request.body)
    return response
      .status(201)
      .json(successResponse('Customer created successfully.', createdCustomer))
  }

  static deleteCustomer(request: Request, response: Response) {
    const customerId = Array.isArray(request.params.id) ? request.params.id[0] : request.params.id
    CustomerService.deleteCustomer(customerId)
    return response.status(200).json(successResponse('Customer deleted successfully.', null))
  }
}

