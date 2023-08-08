import mongoose from 'mongoose'

interface IUser extends mongoose.Document {
  username: string
  display_name: string
  avatar: string
  password: string
  email: string
  bio: string
  salt: string
  role: string
  setPassword(password: string): void
  validPassword(password: string): boolean
}

export { IUser }
