import { NextFunction, Request, Response } from 'express'
import MESSAGES from '~/constants/messages'
import responseHandler from '~/handlers/response.handler'

const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role === 'admin') {
    next()
  } else {
    return responseHandler.forbidden(res, { message: MESSAGES.FORBIDDEN })
  }
}

export default { admin }
