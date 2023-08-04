import { ParamSchema, checkSchema } from 'express-validator'
import databaseService from '~/services/database.service'
import userService from '~/services/user.service'
import { verifyAccessToken } from '~/utils/commons'
import hashPassword from '~/utils/crypto'
import { validate } from '~/utils/validate'
import { Request } from 'express'
import { ErrorWithStatus } from '~/models/error'
import HTTP_STATUS from '~/constants/httpStatus'
import { verifyToken } from '~/utils/jwt'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize } from 'lodash'

const usernameSchema: ParamSchema = {
  notEmpty: {
    errorMessage: 'Tên tài khoản không được trống!'
  },
  isString: {
    errorMessage: 'Tên tài khoản phải là chuỗi!'
  },
  trim: true,
  isLength: {
    options: {
      min: 4,
      max: 10
    },
    errorMessage: 'Tên tài khoản phải có độ dài từ 4 đến 10 ký tự!'
  },
  custom: {
    options: async (value) => {
      const username = await userService.existUsername(value)
      if (username) {
        return Promise.reject('Tên tài khoản đã tồn tại!')
      }
      return true
    }
  }
}

const displayNameSchema: ParamSchema = {
  notEmpty: {
    errorMessage: 'Tên hiển thị không được trống!'
  },
  isString: {
    errorMessage: 'Tên hiển thị phải là chuỗi!'
  },
  trim: true,
  isLength: {
    options: {
      min: 2,
      max: 25
    },
    errorMessage: 'Tên hiển thị phải có độ dài từ 2 đến 25 ký tự!'
  }
}

const passwordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: 'Mật khẩu không được trống!'
  },
  isString: {
    errorMessage: 'Mật khẩu phải là chuỗi!'
  },
  trim: true,
  isLength: {
    options: {
      min: 6,
      max: 20
    },
    errorMessage: 'Mật khẩu phải có độ dài từ 6 đến 20 ký tự!'
  },
  isStrongPassword: {
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0
    },
    errorMessage: 'Mật khẩu phải có ít nhất 1 chữ thường, 1 chữ hoa, 1 số!'
  }
}

const confirmPasswordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: 'Xác nhận mật khẩu không được trống!'
  },
  isString: {
    errorMessage: 'Xác nhận mật khẩu phải là chuỗi!'
  },
  trim: true,
  custom: {
    options: (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Xác nhận mật khẩu không khớp!')
      }
      return true
    }
  }
}

const registerValidator = validate(
  checkSchema(
    {
      username: usernameSchema,
      display_name: displayNameSchema,
      password: passwordSchema,
      confirm_password: confirmPasswordSchema
    },
    ['body']
  )
)

const loginValidator = validate(
  checkSchema(
    {
      username: {
        notEmpty: {
          errorMessage: 'Tên tài khoản không được trống!'
        },
        isString: {
          errorMessage: 'Tên tài khoản phải là chuỗi!'
        },
        trim: true,
        isLength: {
          options: {
            min: 4,
            max: 10
          },
          errorMessage: 'Tên tài khoản phải có độ dài từ 4 đến 10 ký tự!'
        },
        custom: {
          options: async (value, { req }) => {
            const user = await databaseService.users.findOne({
              username: value.toLowerCase().trim(),
              password: hashPassword(req.body.password)
            })
            if (!user) {
              return Promise.reject('Tên tài khoản hoặc mật khẩu không đúng!')
            }

            req.user = user
            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: 'Mật khẩu không được trống!'
        },
        isString: {
          errorMessage: 'Mật khẩu phải là chuỗi!'
        },
        trim: true,
        isLength: {
          options: {
            min: 6,
            max: 20
          },
          errorMessage: 'Mật khẩu phải có độ dài từ 6 đến 20 ký tự!'
        },
        isStrongPassword: {
          options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0
          },
          errorMessage: 'Mật khẩu phải có ít nhất 1 chữ thường, 1 chữ hoa, 1 số!'
        }
      }
    },
    ['body']
  )
)

const accessTokenValidator = validate(
  checkSchema({
    Authorization: {
      custom: {
        options: async (value: string, { req }) => {
          const accessToken = (value || '').split(' ')[1]
          return await verifyAccessToken(accessToken, req as Request)
        }
      }
    }
  })
)

const refreshTokenValidator = validate(
  checkSchema(
    {
      refreshToken: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: 'refreshToken không được trống!',
                statusCode: HTTP_STATUS.BAD_REQUEST
              })
            }

            try {
              const [decodedRefreshToken, refreshToken] = await Promise.all([
                verifyToken({
                  token: value,
                  secretOrPublicKey: process.env.SECRET_KEY as string
                }),
                await databaseService.refreshTokens.findOne({ token: value })
              ])

              if (refreshToken === null) {
                throw new ErrorWithStatus({
                  message: 'refreshToken không tồn tại!',
                  statusCode: HTTP_STATUS.UNAUTHORISED
                })
              }
              ;(req as Request).decodedRefreshToken = decodedRefreshToken
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({
                  message: capitalize(error.message),
                  statusCode: HTTP_STATUS.UNAUTHORISED
                })
              }
              throw error
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export default { registerValidator, loginValidator, accessTokenValidator, refreshTokenValidator }
