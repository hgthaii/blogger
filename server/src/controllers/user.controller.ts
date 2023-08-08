import HTTP_STATUS from '~/constants/httpStatus'
import MESSAGES from '~/constants/messages'
import responseHandler from '~/handlers/response.handler'
import { Request, Response } from 'express'
import userModel from '~/models/user.model'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import rftkModel from '~/models/rftk.model'
config()

const register = async (req: Request, res: Response) => {
  try {
    const { username, password, display_name, email } = req.body

    const user = new userModel({
      username,
      password,
      display_name,
      email
    })

    user.setPassword(password)
    await user.save()

    return responseHandler.created(res, {
      statusCode: HTTP_STATUS.CREATED,
      message: MESSAGES.REGISTER_SUCCESS
    })
  } catch (error) {
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.REGISTER_FAIL,
      error: error as Error
    })
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const user = await userModel.findOne({ username }).select('_id role password salt username display_name email')

    if (!user) {
      return responseHandler.badRequest(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.USER_NOT_FOUND
      })
    }

    if (!user.validPassword(password)) {
      return responseHandler.badRequest(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.WRONG_PASSWORD
      })
    }

    const payload = {
      user_id: user._id,
      role: user.role
    }

    const access_token = jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: '30d' })
    const refresh_token = jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: '365d' })

    const rftkDoc = new rftkModel({
      token: refresh_token,
      user_id: user._id,
      exp: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    })

    await rftkDoc.save()

    user.password = undefined as unknown as string
    user.salt = undefined as unknown as string

    req.user = user
    return responseHandler.ok(res, {
      statusCode: HTTP_STATUS.OK,
      message: MESSAGES.LOGIN_SUCCESS,
      data: {
        access_token,
        refresh_token
      }
    })
  } catch (error) {
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.LOGIN_FAIL,
      error: error as Error
    })
  }
}

const logout = async (req: Request, res: Response) => {
  try {
    const refresh_token = req.headers['authorization']?.split(' ')[1]
    const rftkDoc = await rftkModel.findOneAndDelete({ token: refresh_token })
    if (!rftkDoc) {
      return responseHandler.badRequest(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.LOGOUT_FAIL
      })
    }
    return responseHandler.ok(res, {
      statusCode: HTTP_STATUS.OK,
      message: MESSAGES.LOGOUT_SUCCESS
    })
  } catch (error) {
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.LOGOUT_FAIL,
      error: error as Error
    })
  }
}

export default { register, login, logout }
