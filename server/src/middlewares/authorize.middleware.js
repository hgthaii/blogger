import userModel from '../models/user.model.js'
import responseHandler from '../handlers/response.handler.js'
import MESSAGES from '../constants/messages.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import tokenMiddleware from './token.middleware.js'

const admin = async (req, res, next) => {
  const tokenDecoded = tokenMiddleware.tokenDecode(req)
  const userId = tokenDecoded.userId
  const user = await userModel.findById(userId)
  const role = user.role

  if (!user) {
    return responseHandler.notFound(res, {
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: MESSAGES.USER_NOT_FOUND
    })
  }

  if (role === 'admin') {
    next()
  } else if (role === 'user') {
    return responseHandler.unauthorized(res, {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: MESSAGES.UNAUTHORIZED
    })
  }
}

export default { admin }
