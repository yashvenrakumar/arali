import type { CreateCustomerPayload, Customer } from '../../types/customer'
import { api } from '../../services/api'

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export const customerApi = {
  async getCustomers(): Promise<Customer[]> {
    const response = await api.get<ApiResponse<Customer[]>>('/customers')
    return response.data.data
  },
  async createCustomer(payload: CreateCustomerPayload): Promise<Customer> {
    const response = await api.post<ApiResponse<Customer>>('/customers', payload)
    return response.data.data
  },
  async deleteCustomer(id: string): Promise<string> {
    const response = await api.delete<ApiResponse<null>>(`/customers/${id}`)
    return response.data.message
  },
}

