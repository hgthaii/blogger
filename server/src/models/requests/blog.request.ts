import mongoose from 'mongoose'

interface ITags {
  name: string
}

interface IAuthor {
  name: string
  avatar: string
}

interface IBlog extends mongoose.Document {
  title: string
  content: string
  author: IAuthor
  tags: ITags[]
  updated_at: Date
}

export { IBlog, ITags }
