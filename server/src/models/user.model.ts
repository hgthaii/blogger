import mongoose, { mongo } from 'mongoose'
import crypto from 'crypto'
import { IUser } from '~/models/requests/user.request'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^[a-zA-Z0-9]+$/, 'Tên người dùng không được chứa ký tự đặc biệt!']
  },
  display_name: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1628586213/avatar/avatar-default.png'
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  bio: {
    type: String,
    default: ''
  },
  salt: {
    type: String,
    select: false
  },
  role: {
    enum: ['admin', 'user'],
    type: String,
    default: 'user'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

userSchema.methods.setPassword = function (password: string) {
  // Tạo một chuỗi ngẫu nhiên
  this.salt = crypto.randomBytes(16).toString('hex')

  // Băm mật khẩu với salt
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
}

userSchema.methods.validPassword = function (password: string) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
  return this.password === hash
}

const userModel = mongoose.model<IUser>('User', userSchema)

export default userModel
