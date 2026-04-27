import type { NextFunction, Request, Response } from 'express'
import { AppError } from '../utils/app-error.util'

export const notFound = (_request: Request, _response: Response, next: NextFunction) => {
  next(new AppError('Route not found.', 404))
}

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: null,
    })
  }

  return response.status(500).json({
    success: false,
    message: 'Internal server error.',
    data: null,
  })
}

