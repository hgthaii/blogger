import { ObjectId } from 'mongodb'

interface BlogType {
  _id?: ObjectId
  title: string
  content: string
  author: string
  created_at?: Date
  updated_at?: Date
  photo?: string
  tags?: string[]
}

class Blog {
  _id?: ObjectId
  title: string
  content: string
  author: string
  created_at: Date
  updated_at: Date
  photo: string
  tags: string[]
  constructor({ _id, title, content, created_at, updated_at, author, photo, tags }: BlogType) {
    const date = new Date()

    this._id = _id
    this.title = title
    this.content = content
    this.author = author || ''
    this.created_at = created_at || date
    this.updated_at = updated_at || date
    this.photo = photo || ''
    this.tags = tags || []
  }
}

export default Blog
