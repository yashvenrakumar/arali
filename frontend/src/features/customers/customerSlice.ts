import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { customerApi } from './customerApi'
import type { CreateCustomerPayload, Customer } from '../../types/customer'

interface CustomerState {
  customers: Customer[]
  isLoading: boolean
  error: string | null
}

const initialState: CustomerState = {
  customers: [],
  isLoading: false,
  error: null,
}

export const fetchCustomers = createAsyncThunk('customers/fetchAll', async (_, thunkApi) => {
  try {
    return await customerApi.getCustomers()
  } catch {
    return thunkApi.rejectWithValue('Failed to fetch customers.')
  }
})

export const addCustomer = createAsyncThunk(
  'customers/add',
  async (payload: CreateCustomerPayload, thunkApi) => {
    try {
      const createdCustomer = await customerApi.createCustomer(payload)
      toast.success('Customer added successfully.')
      return createdCustomer
    } catch {
      toast.error('Failed to add customer.')
      return thunkApi.rejectWithValue('Failed to add customer.')
    }
  },
)

export const removeCustomer = createAsyncThunk('customers/remove', async (id: string, thunkApi) => {
  try {
    const message = await customerApi.deleteCustomer(id)
    toast.success(message)
    return id
  } catch {
    toast.error('Failed to delete customer.')
    return thunkApi.rejectWithValue('Failed to delete customer.')
  }
})

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<Customer[]>) => {
        state.isLoading = false
        state.customers = action.payload
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(addCustomer.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.isLoading = false
        state.customers.push(action.payload)
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(removeCustomer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeCustomer.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false
        state.customers = state.customers.filter((customer) => customer.id !== action.payload)
      })
      .addCase(removeCustomer.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export default customerSlice.reducer

