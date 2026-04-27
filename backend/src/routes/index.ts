import { Router } from 'express'
import { customerRouter } from './customer.route'

const apiRouter = Router()

apiRouter.use('/customers', customerRouter)

export { apiRouter }

