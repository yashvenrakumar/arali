import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { apiRouter } from './routes'
import { errorHandler, notFound } from './middlewares/error.middleware'
import { openApiDocument } from './docs/openapi'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument))
app.use('/api', apiRouter)
app.use(notFound)
app.use(errorHandler)

export { app }

