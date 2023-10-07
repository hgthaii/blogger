import responseHandler from '../handlers/response.handler.js'
import userModel from '../models/user.model.js'
import MESSAGES from '../constants/messages.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'
import refreshTokenModel from '../models/rftk.model.js'
dotenv.config()

const register = async (req, res) => {
  try {
    const { username, password, displayName } = req.body

    const user = new userModel({
      username,
      password,
      displayName
    })

    user.setPassword(password)
    await user.save()

    return responseHandler.created(res, {
      statusCode: HTTP_STATUS.CREATED,
      message: MESSAGES.REGISTER_SUCCESS,
      data: user
    })
  } catch (error) {
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.REGISTER_FAIL,
      error
    })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await userModel.findOne({ username }).select('+password displayName avatar role bio _id +salt')

    if (!user) {
      return responseHandler.notFound(res, {
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.USERNAME_NOT_FOUND
      })
    }

    if (!user.validPassword(password)) {
      return responseHandler.badRequest(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.PASSWORD_INCORRECT
      })
    }

    const payload = {
      userId: user._id,
      role: user.role,
      displayName: user.displayName
    }

    const accessToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '30d' })
    const refreshToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '120d' })

    const rftkModel = new refreshTokenModel({
      token: refreshToken,
      userId: user._id,
      expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000)
    })

    await rftkModel.save()

    user.password = undefined
    user.salt = undefined

    req.user = user

    return responseHandler.ok(res, {
      statusCode: HTTP_STATUS.OK,
      message: MESSAGES.LOGIN_SUCCESS,
      data: {
        accessToken,
        refreshToken
      }
    })
  } catch (error) {
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.LOGIN_FAIL,
      error
    })
  }
}

const logout = async (req, res) => {
  try {
    const refreshToken = req.headers['authorization'].split(' ')[1]
    if (!refreshToken) {
      return responseHandler.badRequest(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.LOGOUT_FAIL
      })
    }
    await refreshTokenModel.findOneAndDelete({ token: refreshToken })
    return responseHandler.ok(res, {
      statusCode: HTTP_STATUS.OK,
      message: MESSAGES.LOGOUT_SUCCESS
    })
  } catch (error) {
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.LOGOUT_FAIL,
      error
    })
  }
}

export default {
  register,
  login,
  logout
}
