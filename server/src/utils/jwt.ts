import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { TokenPayload } from '~/models/requests/user.request'
config()

const signToken = ({
  payload,
  secretKey = process.env.SECRET_KEY as string,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  secretKey?: string
  options?: jwt.SignOptions
}) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, options, (error, token) => {
      if (error) return reject(error)
      resolve(token)
    })
  })
}

const verifyToken = ({ token, secretOrPublicKey }: { token: string; secretOrPublicKey: string }) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (error, decoded) => {
      if (error) {
        throw reject(error)
      }
      resolve(decoded as TokenPayload)
    })
  })
}

export { signToken, verifyToken }
