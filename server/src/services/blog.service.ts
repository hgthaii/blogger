import { ObjectId } from 'mongodb'
import { BlogRequestBody } from '~/models/requests/blog.request'
import databaseService from '~/services/database.service'

class BlogService {
  async createBlog(payload: BlogRequestBody) {
    const blog_id = new ObjectId()
    await databaseService.blogs.insertOne({})
  }
}

const blogService = new BlogService()
export default blogService
