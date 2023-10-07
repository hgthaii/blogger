import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  slug: { type: String, trim: true, default: '' },
  estimatedReadTime: { type: Number },
  image: { type: String, trim: true, default: '' },
  video: { type: String, trim: true, default: '' },
  views: { type: Number, default: 0 },
  category: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
        ref: 'Category'
      },
      slugName: {
        type: String,
        trim: true,
        ref: 'Category'
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const blogModel = mongoose.model('Blog', blogSchema)

export default blogModel
