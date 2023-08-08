import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

const tagModel = mongoose.model('Tag', tagSchema)

export default tagModel
