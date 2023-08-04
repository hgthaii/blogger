import express from 'express'
import userController from '~/controllers/user.controller'
import userMiddleware from '~/middlewares/user.middleware'
import wrapRequestHandler from '~/utils/wrapRequest'

const router = express.Router()

router.post('/register', userMiddleware.registerValidator, wrapRequestHandler(userController.register))

router.post('/login', userMiddleware.loginValidator, wrapRequestHandler(userController.login))

router.post(
  '/logout',
  userMiddleware.accessTokenValidator,
  userMiddleware.refreshTokenValidator,
  wrapRequestHandler(userController.logout)
)

export default router
