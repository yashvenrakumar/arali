import { Router } from 'express'
import { CustomerController } from '../controllers/customer.controller'
import { validate } from '../middlewares/validate.middleware'
import { createCustomerSchema } from '../validators/customer.validator'

const customerRouter = Router()

customerRouter.post('/', validate(createCustomerSchema), CustomerController.createCustomer)
customerRouter.get('/', CustomerController.getCustomers)
customerRouter.delete('/:id', CustomerController.deleteCustomer)

export { customerRouter }

