import HTTP_STATUS from '~/constants/httpStatus'
import MESSAGES from '~/constants/messages'

type ErrorType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>

class ErrorWithStatus {
  message: string
  statusCode: number
  errors: ErrorType
  constructor({ message, statusCode, errors }: { message: string; statusCode: number; errors?: ErrorType }) {
    this.message = message
    this.statusCode = statusCode
    this.errors = errors || {}
  }
}

class EntityError extends ErrorWithStatus {
  errors: ErrorType
  constructor({ message = MESSAGES.VALIDATE_ERROR, errors }: { message?: string; errors: ErrorType }) {
    super({ message, statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}

export { ErrorWithStatus, EntityError }
