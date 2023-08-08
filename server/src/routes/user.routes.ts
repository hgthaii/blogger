import express from 'express'
import userController from '~/controllers/user.controller'
import requestHanlder from '~/handlers/request.hanlder'
import { body } from 'express-validator'
import userModel from '~/models/user.model'
import HTTP_STATUS from '~/constants/httpStatus'
import { EMAIL_REGEX } from '~/constants/regex'
import tokenMiddleware from '~/middlewares/token.middleware'

const router = express.Router()

router.post(
  '/register',
  body('username')
    .exists()
    .withMessage('Tên tài khoản là bắt buộc.')
    .isLength({ min: 4, max: 20 })
    .withMessage('Tài khoản phải từ 4 đến 20 ký tự.')
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value })
      if (user) {
        return Promise.reject({
          statusCode: HTTP_STATUS.BAD_REQUEST,
          message: 'Tài khoản đã tồn tại.'
        })
      }
      return true
    })
    .escape(),
  body('password')
    .exists()
    .withMessage('Mật khẩu là bắt buộc.')
    .isLength({ min: 6, max: 20 })
    .withMessage('Mật khẩu phải từ 6 đến 20 ký tự.')
    .escape(),
  body('display_name')
    .exists()
    .withMessage('Tên hiển thị là bắt buộc.')
    .isLength({ min: 2, max: 20 })
    .withMessage('Tên hiển thị phải từ 2 đến 20 ký tự.')
    .escape(),
  body('email')
    .exists()
    .withMessage('Email là bắt buộc.')
    .isEmail()
    .withMessage('Email không hợp lệ.')
    .custom(async (value) => {
      const checkEmailExist = await userModel.findOne({ email: value })
      const regex = new RegExp(EMAIL_REGEX)
      const isValidEmail = (email: string) => {
        return regex.test(email)
      }
      if (checkEmailExist) {
        return Promise.reject({
          statusCode: HTTP_STATUS.BAD_REQUEST,
          message: 'Email đã tồn tại.'
        })
      }
      if (isValidEmail(value) === false) {
        return Promise.reject({
          statusCode: HTTP_STATUS.BAD_REQUEST,
          message: 'Email không hợp lệ.'
        })
      }
      return true
    }),
  body('confirm_password')
    .exists()
    .withMessage('Xác nhận mật khẩu là bắt buộc.')
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Xác nhận mật khẩu không khớp.')
      }
      return true
    }),
  requestHanlder.validate,
  userController.register
)

router.post(
  '/login',
  body('username')
    .exists()
    .withMessage('Tên người dùng không được trống.')
    .isLength({ min: 4 })
    .withMessage('Tên người dùng phải lớn hơn 4 ký tự'),
  body('password')
    .exists()
    .withMessage('Mật khẩu không được trống.')
    .isLength({ min: 4 })
    .withMessage('Mật khẩu phải dài hơn 4 ký tự.'),
  requestHanlder.validate,
  userController.login
)

router.post('/logout', userController.logout)

export default router
