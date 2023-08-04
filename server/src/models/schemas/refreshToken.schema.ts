import { ObjectId } from 'mongodb'

interface RefreshTokenType {
  _id?: ObjectId
  token: string
  user_id: ObjectId
  created_at?: Date
  exp: number
  iat: number
}

class RefreshToken {
  _id?: ObjectId
  token: string
  user_id: ObjectId
  created_at: Date
  exp: Date
  iat: Date
  constructor({ _id, token, user_id, created_at, exp, iat }: RefreshTokenType) {
    this._id = _id
    this.token = token
    this.user_id = user_id
    this.created_at = created_at || new Date()
    this.exp = new Date(exp * 1000)
    this.iat = new Date(iat * 1000)
  }
}

export default RefreshToken
