import blogModel from '../models/blog.model.js'
import MESSAGES from '../constants/messages.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import responseHandler from '../handlers/response.handler.js'
import tokenMiddleware from '../middlewares/token.middleware.js'
import categoryModel from '../models/category.model.js'
import unidecode from 'unidecode'
import { caculatorEstimatedReadTime } from '../utils/estimatedReadTime.js'
import slugify from 'slugify'

const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body
    const tokenDecoded = tokenMiddleware.tokenDecode(req)
    const userId = tokenDecoded.userId

    const estimatedReadTime = caculatorEstimatedReadTime(content)

    let existingTitle = await blogModel.findOne({ title })
    if (existingTitle) {
      return responseHandler.badRequest(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.TITLE_EXISTED
      })
    }

    const slug = slugify(title, {
      replacement: '-', // Sử dụng dấu gạch ngang để thay thế khoảng trắng
      remove: /[^a-zA-Z0-9 -]/g, // Loại bỏ tất cả các ký tự không phải chữ cái, chữ số, khoảng trắng, hoặc dấu gạch ngang
      lower: true // Chuyển đổi thành chữ thường
    })
    // const slug = latinString.replace(/-+/g, '-')

    // Kiểm tra xem category đã tồn tại trong cơ sở dữ liệu hay chưa
    let existingCategory = await categoryModel.findOne({ name: category.name })

    if (!existingCategory) {
      // Nếu category chưa tồn tại, hãy tạo nó
      const latinString = unidecode(category.name)
      const lowerCaseLatinString = latinString.toLowerCase()
      const slugName = lowerCaseLatinString.replace(/ /g, '-')
      existingCategory = new categoryModel({ name: category.name, slugName })
      await existingCategory.save()
    }

    const newBlog = new blogModel({
      userId,
      title,
      content,
      slug,
      estimatedReadTime,
      category: [{ _id: existingCategory._id, name: existingCategory.name, slugName: existingCategory.slugName }]
    })

    await newBlog.save()

    return responseHandler.created(res, {
      statusCode: HTTP_STATUS.CREATED,
      message: MESSAGES.CREATE_BLOG_SUCCESS,
      data: newBlog
    })
  } catch (error) {
    console.log(error)
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.CREATE_BLOG_FAIL,
      error
    })
  }
}

const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params
    if (!blogId) {
      return responseHandler.badRequest(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.BLOG_ID_REQUIRED
      })
    }

    const { title, content, category } = req.body
    let existingCategory = await categoryModel.findOne({ name: category.name })

    if (!existingCategory) {
      // Nếu category chưa tồn tại, hãy tạo nó
      const latinString = unidecode(category.name)
      const lowerCaseLatinString = latinString.toLowerCase()
      const slugName = lowerCaseLatinString.replace(/ /g, '-')
      existingCategory = new categoryModel({ name: category.name, slugName })
      await existingCategory.save()
    }
    const blog = await blogModel
      .findByIdAndUpdate(
        blogId,
        {
          title,
          content,
          category: [{ _id: existingCategory._id, name: existingCategory.name, slugName: existingCategory.slugName }]
        },
        { new: true }
      )
      .sort({ createdAt: -1 })
    if (!blog) {
      return responseHandler.notFound(res, {
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.BLOG_NOT_FOUND
      })
    }
    blog.updatedAt = new Date()
    await blog.save()
    return responseHandler.ok(res, {
      statusCode: HTTP_STATUS.OK,
      message: MESSAGES.UPDATE_BLOG_SUCCESS,
      data: blog
    })
  } catch (error) {
    console.log(error)
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.UPDATE_BLOG_FAIL,
      error
    })
  }
}

const getBlogWithSlugName = async (req, res) => {
  try {
    const { slugName } = req.params
    if (!slugName) {
      return responseHandler.badRequest(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.CATEGORY_ID_REQUIRED
      })
    }

    // Sử dụng categoryId để tìm tất cả các bài viết có categoryId tương ứng
    const blogs = await blogModel.find({ 'category.slugName': slugName }).sort({ createdAt: -1 })

    if (blogs.length === 0) {
      return responseHandler.notFound(res, {
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.NO_POSTS_FOUND
      })
    }

    return responseHandler.ok(res, blogs)
  } catch (error) {
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.GET_BLOG_FAIL,
      error
    })
  }
}

const getBlogDetailWithSlug = async (req, res) => {
  try {
    const { slug } = req.params
    if (!slug) {
      return responseHandler.badRequest(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.BLOG_ID_REQUIRED
      })
    }

    const blog = await blogModel.findOne({ slug })

    if (!blog) {
      return responseHandler.notFound(res, {
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.BLOG_NOT_FOUND
      })
    }

    return responseHandler.ok(res, blog)
  } catch (error) {
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.GET_BLOG_FAIL,
      error
    })
  }
}

const deleteBlogWithId = async (req, res) => {
  try {
    const { blogId } = req.params
    if (!blogId) {
      return responseHandler.badRequest(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.BLOG_ID_REQUIRED
      })
    }

    const deleteBlog = await blogModel.findByIdAndDelete(blogId)

    if (!deleteBlog) {
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
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.DELETE_BLOG_FAIL,
      error
    })
  }
}

const incrementViewBlogWithSlug = async (req, res) => {
  try {
    const { slug } = req.params
    if (!slug) {
      return responseHandler.badRequest(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.BLOG_ID_REQUIRED
      })
    }

    const blog = await blogModel.findOne({ slug }).select('views')

    if (!blog) {
      return responseHandler.notFound(res, {
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.BLOG_NOT_FOUND
      })
    }

    blog.views++

    await blog.save()

    return responseHandler.ok(res, { views: blog.views })
  } catch (error) {
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.INCREMENT_VIEW_BLOG_FAIL,
      error
    })
  }
}

const getMutilViewListBlogs = async (req, res) => {
  try {
    const hotBlogs = await blogModel.find().sort({ views: -1 }).limit(5)
    if (hotBlogs.length === 0) {
      return responseHandler.notFound(res, {
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.NO_POSTS_FOUND
      })
    }

    return responseHandler.ok(res, hotBlogs)
  } catch (error) {
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.GET_BLOG_FAIL,
      error
    })
  }
}

export default {
  createBlog,
  updateBlog,
  getBlogWithSlugName,
  deleteBlogWithId,
  getBlogDetailWithSlug,
  getMutilViewListBlogs,
  incrementViewBlogWithSlug
}
