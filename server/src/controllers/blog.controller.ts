import e, { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import MESSAGES from '~/constants/messages'
import responseHandler from '~/handlers/response.handler'
import tokenMiddleware from '~/middlewares/token.middleware'
import blogModel from '~/models/blog.model'
import { IBlog, ITags } from '~/models/requests/blog.request'
import tagModel from '~/models/tag.model'

const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, author, tags }: IBlog = req.body

    const tokenDecoded = await tokenMiddleware.tokenDecode(req)
    if (typeof tokenDecoded === 'object' && tokenDecoded !== null) {
      const user_id = tokenDecoded.user_id

      const newBlog = new blogModel({
        user_id,
        title,
        content,
        author,
        tags: []
      })

      await Promise.all(
        tags.map(async (tag: ITags) => {
          const existingTag = await tagModel.findOne({ name: tag.name }).lean()
          if (!existingTag) {
            const newTag = new tagModel({
              name: tag.name
            })
            await newTag.save()
            newBlog.tags.push(newTag)
            return newTag
          }
          newBlog.tags.push(existingTag)
          return existingTag
        })
      )

      await newBlog.save()
    } else {
      console.error('Không tìm thấy thông tin user_id trong token hoặc token không hợp lệ.')
    }

    return responseHandler.created(res, {
      statusCode: HTTP_STATUS.CREATED,
      message: MESSAGES.CREATE_BLOG_SUCCESS
      // data: newBlog
    })
  } catch (error) {
    console.error(error)
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.CREATE_BLOG_FAIL,
      error: error as Error
    })
  }
}

const updateBlog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params
    if (!blogId) {
      return responseHandler.badRequest(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.BLOG_ID_REQUIRED
      })
    }
    const { title, content, author, tags }: IBlog = req.body
    const blog = await blogModel.findByIdAndUpdate(
      blogId,
      {
        title,
        content,
        author,
        tags
      },
      { new: true }
    )

    if (!blog) {
      return responseHandler.notFound(res, {
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.BLOG_NOT_FOUND
      })
    }

    blog.updated_at = new Date()
    await blog.save()

    return responseHandler.ok(res, {
      statusCode: HTTP_STATUS.OK,
      message: MESSAGES.EDIT_BLOG_SUCCESS,
      data: blog
    })
  } catch (error) {
    console.log(error)
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.EDIT_BLOG_FAIL
    })
  }
}

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params
    if (!blogId) {
      return responseHandler.badRequest(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.BLOG_ID_REQUIRED
      })
    }
    const blog = await blogModel.findByIdAndDelete(blogId)
    if (!blog) {
      return responseHandler.notFound(res, {
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.BLOG_NOT_FOUND
      })
    }
    return responseHandler.ok(res, {
      statusCode: HTTP_STATUS.OK,
      message: MESSAGES.DELETE_BLOG_SUCCESS
    })
  } catch (error) {
    console.log(error)
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.DELETE_BLOG_FAIL,
      error: error as Error
    })
  }
}

const getBlogs = async (req: Request, res: Response) => {
  try {
    const { tagId } = req.params
    if (!tagId) {
      return responseHandler.badRequest(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.TAG_ID_REQUIRED
      })
    }
    const result = await blogModel.find({ 'tags._id': tagId }).lean()
    return responseHandler.ok(res, {
      statusCode: HTTP_STATUS.OK,
      message: MESSAGES.GET_BLOG_SUCCESS,
      data: result
    })
  } catch (error) {
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.GET_BLOG_FAIL,
      error: error as Error
    })
  }
}

export default { createBlog, updateBlog, deleteBlog, getBlogs }
