import type { NextFunction, Request, Response } from 'express'
import type { ZodSchema } from 'zod'
import { AppError } from '../utils/app-error.util'

export const validate =
  (schema: ZodSchema) => (request: Request, _response: Response, next: NextFunction) => {
    const parsedData = schema.safeParse(request.body)
    if (!parsedData.success) {
      const errorMessage = parsedData.error.issues[0]?.message ?? 'Invalid request payload.'
      return next(new AppError(errorMessage, 400))
    }

    request.body = parsedData.data
    return next()
  }

