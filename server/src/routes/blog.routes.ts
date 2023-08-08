import express from 'express'
import { body } from 'express-validator'
import blogController from '~/controllers/blog.controller'
import requestHanlder from '~/handlers/request.hanlder'
import authorizationMiddleware from '~/middlewares/authorization.middleware'
import tokenMiddleware from '~/middlewares/token.middleware'

const router = express.Router()

router.post(
  '/',
  body('title')
    .exists()
    .withMessage('Tiêu đề là bắt buộc.')
    .isLength({ min: 4, max: 200 })
    .withMessage('Tiêu đề phải từ 4 đến 200 ký tự.')
    .escape(),
  body('content')
    .exists()
    .withMessage('Nội dung là bắt buộc.')
    .isLength({ min: 4, max: 9999 })
    .withMessage('Nội dung phải từ 4 đến 9999 ký tự.')
    .escape(),
  // body('author')
  //   .exists()
  //   .withMessage('Tác giả là bắt buộc.')
  //   .isLength({ min: 4, max: 200 })
  //   .withMessage('Tác giả phải từ 4 đến 200 ký tự.')
  //   .escape(),
  body('author.name')
    .exists()
    .withMessage('Tên tác giả là bắt buộc.')
    .escape()
    .trim()
    .isLength({ min: 4, max: 200 })
    .withMessage('Tên tác giả phải từ 4 đến 200 ký tự.'),
  body('author.avatar').optional().trim(),
  body('tags')
    .exists()
    .withMessage('Thể loại là bắt buộc.')
    .isLength({ min: 4, max: 200 })
    .withMessage('Thể loại phải từ 4 đến 200 ký tự.'),
  requestHanlder.validate,
  tokenMiddleware.auth,
  authorizationMiddleware.admin,
  blogController.createBlog
)

router.put('/:blogId', tokenMiddleware.auth, authorizationMiddleware.admin, blogController.updateBlog)

router.delete('/:blogId', tokenMiddleware.auth, authorizationMiddleware.admin, blogController.deleteBlog)

router.get('/:tagId', blogController.getBlogs)

export default router
