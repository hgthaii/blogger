import { ValidationChain, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import { EntityError, ErrorWithStatus } from '~/models/error'
import HTTP_STATUS from '~/constants/httpStatus'

const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req)

    const errors = validationResult(req)
    if (errors.isEmpty()) return next()

    const errorObject = errors.mapped()
    const entityError = new EntityError({ errors: {} })

    for (const key in errorObject) {
      const { msg } = errorObject[key]
      if (msg instanceof ErrorWithStatus && msg.statusCode === HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        errorObject[key] = errorObject[key].msg.errors
        return next(msg)
      }
      entityError.errors[key] = errorObject[key]
    }
    next(entityError)
  }
}

export { validate }
