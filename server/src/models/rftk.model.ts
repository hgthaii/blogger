import mongoose, { ObjectId } from 'mongoose'

const rftkSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  exp: {
    type: Date,
    default: Date.now
  }
})

const rftkModel = mongoose.model('Rftk', rftkSchema)

export default rftkModel
