import { ObjectId } from 'mongodb'

interface UserType {
  _id?: ObjectId
  username: string
  display_name: string
  password: string
  created_at?: Date
  updated_at?: Date
  forgot_password?: string
  bio?: string
  avatar?: string
}

class User {
  _id?: ObjectId
  username: string
  display_name: string
  password: string
  created_at: Date
  updated_at: Date
  forgot_password: string
  bio: string
  avatar: string
  constructor({
    _id,
    username,
    display_name,
    password,
    created_at,
    updated_at,
    forgot_password,
    bio,
    avatar
  }: UserType) {
    const date = new Date()

    this._id = _id
    this.username = username
    this.display_name = display_name || 'user'
    this.password = password
    this.created_at = created_at || date
    this.updated_at = updated_at || date
    this.forgot_password = forgot_password || ''
    this.bio = bio || ''
    this.avatar = avatar || ''
  }
}

export default User
