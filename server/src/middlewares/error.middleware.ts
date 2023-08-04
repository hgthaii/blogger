import { Request, Response, NextFunction } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/error'

const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorWithStatus) {
    return res.status(err.statusCode).json({ statusCode: err.statusCode, message: err.message, errors: err.errors })
  }

  Object.getOwnPropertyNames(err).forEach((key) => {
    return Object.defineProperty(err, key, { enumerable: true })
  })

  return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: err.message })
}

export default defaultErrorHandler
