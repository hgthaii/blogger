import exp from 'constants'
import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import MESSAGES from '~/constants/messages'
import responseHandler from '~/handlers/response.handler'
import formidable from 'formidable'
import path from 'path'

const uploadSigleImage = async (req: Request, res: Response) => {
  try {
    const form = formidable({
      uploadDir: path.resolve('uploads'),
      maxFiles: 1,
      keepExtensions: true,
      maxFileSize: 300 * 1024 // 300KB
    })

    form.parse(req, (err, fields, files) => {
      if (err) {
        throw err
      }
    })

    return responseHandler.ok(res, {
      statusCode: HTTP_STATUS.OK,
      message: MESSAGES.UPLOAD_IMAGE_SUCCESS
      // data: req.file
    })
  } catch (error) {
    return responseHandler.internalServerError(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: MESSAGES.UPLOAD_IMAGE_FAIL,
      error: error as Error
    })
  }
}

export default { uploadSigleImage }
