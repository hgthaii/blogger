import { IUser } from './models/requests/user.request'
declare module 'express' {
  interface Request {
    user?: IUser
  }
}
