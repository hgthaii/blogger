import { createHash } from 'crypto'
import { config } from 'dotenv'
config()

const sha256 = (data: string) => {
  return createHash('sha256').update(data).digest('hex')
}

const hashPassword = (password: string) => {
  return sha256((password + process.env.SECRET_KEY) as string)
}

export default hashPassword
