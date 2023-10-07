import { Router } from 'express'
import blogController from '../controllers/blog.controller.js'
import { body } from 'express-validator'
import requestHandler from '../handlers/request.handler.js'
import MESSAGES from '../constants/messages.js'
import tokenMiddleware from '../middlewares/token.middleware.js'
import authorizeMiddleware from '../middlewares/authorize.middleware.js'

const router = Router()

router.post(
  '/create',
  body('title')
    .exists()
    .withMessage(`${MESSAGES.TITLE_IS_REQUIRED}`)
    .isLength({ min: 2, max: 100 })
    .withMessage(`${MESSAGES.TITLE_LENGTH}`)
    .escape(),
  body('content')
    .exists()
    .withMessage(`${MESSAGES.CONTENT_IS_REQUIRED}`)
    .isLength({ min: 4, max: 999999 })
    .withMessage(`${MESSAGES.CONTENT_LENGTH}`)
    .escape(),
  body('category.name')
    .exists()
    .withMessage(`${MESSAGES.CATEGORY_IS_REQUIRED}`)
    .isLength({ min: 2, max: 50 })
    .withMessage(`${MESSAGES.CATEGORY_LENGTH}`)
    .escape(),
  requestHandler.validate,
  tokenMiddleware.auth,
  authorizeMiddleware.admin,
  blogController.createBlog
)

router.put('/update/:blogId', tokenMiddleware.auth, authorizeMiddleware.admin, blogController.updateBlog)

router.get('/get/:slugName', blogController.getBlogWithSlugName)

router.get('/get/detail/:slug', blogController.getBlogDetailWithSlug)

router.get('/increment-view/:slug', blogController.incrementViewBlogWithSlug)

router.get('/hot-blogs', blogController.getMutilViewListBlogs)

router.delete('/delete/:blogId', tokenMiddleware.auth, authorizeMiddleware.admin, blogController.deleteBlogWithId)

export default router
