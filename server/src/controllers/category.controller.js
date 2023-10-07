import categoryModel from '../models/category.model.js'
import responseHandler from '../handlers/response.handler.js'
import MESSAGES from '../constants/messages.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import unidecode from 'unidecode'

const createCategory = async (req, res) => {
  try {
    const { name } = req.body
    const category = await categoryModel.findOne({
      name
    })
    if (!category) {
      const latinString = unidecode(name)
      const lowerCaseLatinString = latinString.toLowerCase()
      const slugName = lowerCaseLatinString.replace(/ /g, '-')
      const newCategory = new categoryModel({
        name,
        slugName
      })
      await newCategory.save()
      return responseHandler.created(res, {
        statusCode: HTTP_STATUS.CREATED,
        message: MESSAGES.CREATE_CATEGORY_SUCCESS,
        data: newCategory
      })
    } else {
      return responseHandler.badRequest(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.CATEGORY_EXISTED
      })
    }
  } catch (error) {
    console.log(error)
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.CREATE_CATEGORY_FAIL,
      error
    })
  }
}

const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params
    if (!categoryId) {
      return responseHandler.badRequest(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.CATEGORY_ID_REQUIRED
      })
    }

    const { name } = req.body
    const category = await categoryModel.findByIdAndUpdate(
      categoryId,
      {
        name
      },
      { new: true }
    )
    return responseHandler.ok(res, {
      statusCode: HTTP_STATUS.OK,
      message: MESSAGES.UPDATE_CATEGORY_SUCCESS,
      data: category
    })
  } catch (error) {
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.UPDATE_CATEGORY_FAIL,
      error
    })
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params
    if (!categoryId) {
      return responseHandler.badRequest(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.CATEGORY_ID_REQUIRED
      })
    }

    await categoryModel.findByIdAndDelete(categoryId)
    return responseHandler.ok(res, {
      statusCode: HTTP_STATUS.OK,
      message: MESSAGES.DELETE_CATEGORY_SUCCESS
    })
  } catch (error) {
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.DELETE_CATEGORY_FAIL,
      error
    })
  }
}

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({})
    return responseHandler.ok(res, {
      statusCode: HTTP_STATUS.OK,
      data: categories
    })
  } catch (error) {
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.GET_BLOG_FAIL,
      error
    })
  }
}

export default {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories
}
