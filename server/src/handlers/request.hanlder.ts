import { validationResult } from 'express-validator'
import responseHandler from '~/handlers/response.handler'
import { Request, Response, NextFunction } from 'express'
import MESSAGES from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return responseHandler.badRequest(res, {
      message: MESSAGES.VALIDATE_ERROR,
      error: errors.array()
    })
  }
  next()
}

export default { validate }
