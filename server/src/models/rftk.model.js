import mongoose from 'mongoose'

const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const refreshTokenModel = mongoose.model('RefreshToken', refreshTokenSchema)

export default refreshTokenModel
