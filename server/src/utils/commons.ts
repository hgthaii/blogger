import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/error'
import { verifyToken } from '~/utils/jwt'
import { Request } from 'express'
import { capitalize } from 'lodash'
import { config } from 'dotenv'
import { JsonWebTokenError } from 'jsonwebtoken'
config()

const verifyAccessToken = async (accessToken: string, req?: Request) => {
  if (!accessToken) {
    throw new ErrorWithStatus({
      message: 'Yêu cầu có Access Token để xác thực!',
      statusCode: HTTP_STATUS.UNAUTHORISED
    })
  }

  try {
    const tokenDecoded = await verifyToken({
      token: accessToken,
      secretOrPublicKey: process.env.SECRET_KEY as string
    })
    if (req) {
      ;(req as Request).tokenDecoded = tokenDecoded
      return true
    }

    return tokenDecoded
  } catch (error) {
    throw new ErrorWithStatus({
      message: capitalize((error as JsonWebTokenError).message),
      statusCode: HTTP_STATUS.UNAUTHORISED
    })
  }
}

export { verifyAccessToken }
