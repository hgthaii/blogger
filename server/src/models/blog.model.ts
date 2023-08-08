import mongoose from 'mongoose'
import { IBlog } from '~/models/requests/blog.request'

const blogSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1628586213/avatar/avatar-default.png'
    }
  },
  tags: [
    {
      name: {
        type: String,
        trim: true,
        required: true
      }
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

const blogModel = mongoose.model<IBlog>('Blog', blogSchema)

export default blogModel
