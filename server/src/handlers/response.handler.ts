import { Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'

const responseWithData = (res: Response, statusCode: number, data: object | string) => res.status(statusCode).json(data)

const ok = (res: Response, data: object, message?: string | object) => responseWithData(res, HTTP_STATUS.OK, data)

const created = (res: Response, data: object, message?: string | object) =>
  responseWithData(res, HTTP_STATUS.CREATED, data)

const badRequest = (res: Response, message: string | object) => responseWithData(res, HTTP_STATUS.BAD_REQUEST, message)

const unauthorized = (res: Response, message: string | object) =>
  responseWithData(res, HTTP_STATUS.UNAUTHORIZED, message)

const unableToProcess = (res: Response, message: string | object) =>
  responseWithData(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, message)

const forbidden = (res: Response, message: string | object) => responseWithData(res, HTTP_STATUS.FORBIDDEN, message)

const notFound = (res: Response, message: string | object) => responseWithData(res, HTTP_STATUS.NOT_FOUND, message)

const internalServerError = (res: Response, message: string | object) =>
  responseWithData(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, message)

export default {
  ok,
  created,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  internalServerError,
  unableToProcess
}
