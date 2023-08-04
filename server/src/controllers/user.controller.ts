import MESSAGES from '~/constants/messages'
import userService from '../services/user.service'
import HTTP_STATUS from '~/constants/httpStatus'
import { Request, Response } from 'express'

const register = async (req: Request, res: Response) => {
  const result = await userService.register(req.body)

  return res
    .status(HTTP_STATUS.CREATED)
    .json({ statusCode: HTTP_STATUS.CREATED, message: MESSAGES.REGISTER_SUCCESS, data: result })
}

const login = async (req: Request, res: Response) => {
  const result = await userService.login(req.body)
  return res.status(HTTP_STATUS.OK).json({ statusCode: HTTP_STATUS.OK, message: MESSAGES.LOGIN_SUCCESS, data: result })
}

const logout = async (req: Request, res: Response) => {
  const result = await userService.logout(req.body)
  return res.status(HTTP_STATUS.OK).json({ statusCode: HTTP_STATUS.OK, message: MESSAGES.LOGOUT_SUCCESS, data: result })
}

export default { register, login, logout }
