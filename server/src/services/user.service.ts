import { ObjectId } from 'mongodb'
import { TokenType } from '~/constants/enums'
import { RegisterRequestBody } from '~/models/requests/user.request'
import RefreshToken from '~/models/schemas/refreshToken.schema'
import User from '~/models/schemas/user.schema'
import databaseService from '~/services/database.service'
import hashPassword from '~/utils/crypto'
import { signToken, verifyToken } from '~/utils/jwt'

class UserService {
  private signAccessToken({ user_id }: { user_id: string }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      secretKey: process.env.SECRET_KEY as string,
      options: {
        expiresIn: '30m'
      }
    })
  }

  private signRefreshToken({ user_id, exp }: { user_id: string; exp?: number }) {
    if (exp) {
      return signToken({
        payload: {
          user_id,
          token_type: TokenType.RefreshToken,
          exp
        },
        secretKey: process.env.SECRET_KEY as string
      })
    }
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      secretKey: process.env.SECRET_KEY as string,
      options: {
        expiresIn: '30d'
      }
    })
  }

  private signAccessTokenAndRefreshToken({ user_id }: { user_id: string }) {
    return Promise.all([this.signAccessToken({ user_id }), this.signRefreshToken({ user_id })])
  }

  private decodedRefreshToken(refreshToken: string) {
    return verifyToken({
      token: refreshToken,
      secretOrPublicKey: process.env.SECRET_KEY as string
    })
  }

  async register(payload: RegisterRequestBody) {
    const user_id = new ObjectId()
    await databaseService.users.insertOne(
      new User({
        ...payload,
        _id: user_id,
        username: payload.username.toLowerCase().trim(),
        display_name: payload.display_name,
        password: hashPassword(payload.password)
      })
    )

    const [accessToken, refreshToken] = await this.signAccessTokenAndRefreshToken({
      user_id: user_id.toString()
    })

    const { iat, exp } = await this.decodedRefreshToken(refreshToken as string)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refreshToken as string,
        exp,
        iat
      })
    )

    return {
      accessToken,
      refreshToken
    }
  }

  async existUsername(username: string) {
    const user = await databaseService.users.findOne({ username })
    return Boolean(user)
  }

  async login({ username, password }: { username: string; password: string }) {
    const user = await databaseService.users.findOne({
      username: username.toLowerCase().trim(),
      password: hashPassword(password)
    })

    if (!user) throw new Error('Tài khoản hoặc mật khẩu không đúng!')

    const [accessToken, refreshToken] = await this.signAccessTokenAndRefreshToken({
      user_id: user._id.toString()
    })

    const { exp, iat } = await this.decodedRefreshToken(refreshToken as string)

    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user._id),
        token: refreshToken as string,
        exp,
        iat
      })
    )

    return {
      accessToken,
      refreshToken
    }
  }

  async logout({ refreshToken }: { refreshToken: string }) {
    await databaseService.refreshTokens.deleteOne({ token: refreshToken })
    return {
      message: 'Đăng xuất thành công!'
    }
  }
}

const userService = new UserService()

export default userService
