import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'

interface RegisterRequestBody {
  username: string
  display_name: string
  password: string
  confirm_password: string
}

interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  exp: number
  iat: number
}

export { RegisterRequestBody, TokenPayload }
