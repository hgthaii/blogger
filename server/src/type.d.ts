import { TokenPayload } from '~/models/requests/user.request'
import User from '~/models/schemas/user.schema'

declare module 'express' {
  interface Request {
    user?: User
    tokenDecoded?: TokenPayload
    decodedRefreshToken?: TokenPayload
  }
}
