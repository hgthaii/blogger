import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import responseHandler from '~/handlers/response.handler'
import userModel from '~/models/user.model'
config()

const tokenDecode = async (req: Request) => {
  try {
    const access_token = req.headers['authorization']
    if (access_token) {
      const token = access_token.split(' ')[1]
      return jwt.verify(token, process.env.SECRET_KEY as string)
    }
    return false
  } catch (error) {
    return false
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const tokenDecoded = await tokenDecode(req)
  const expired = new Date((tokenDecoded as any).exp * 1000) // Chú ý: Kiểu của tokenDecoded là any

  if (!tokenDecoded || expired < new Date()) {
    return responseHandler.unauthorized(res, 'Phiên đăng nhập đã hết hạn!')
  }

  if (typeof tokenDecoded === 'object' && 'user_id' in tokenDecoded) {
    const user = await userModel.findById(tokenDecoded.user_id)
    if (!user) {
      return responseHandler.notFound(res, 'Không tìm thấy người dùng!')
    }
    req.user = user
  }

  next()
}

export default { auth, tokenDecode }
