import { Router } from 'express'
import categoryController from '../controllers/category.controller.js'
import { body } from 'express-validator'
import requestHandler from '../handlers/request.handler.js'
import MESSAGES from '../constants/messages.js'
import tokenMiddleware from '../middlewares/token.middleware.js'
import authorizeMiddleware from '../middlewares/authorize.middleware.js'

const router = Router()

router.get('/', categoryController.getAllCategories)

router.post(
  '/create',
  body('name')
    .exists()
    .withMessage(`${MESSAGES.CATEGORY_IS_REQUIRED}`)
    .isLength({ min: 2, max: 50 })
    .withMessage(`${MESSAGES.CATEGORY_LENGTH}`)
    .escape(),
  requestHandler.validate,
  tokenMiddleware.auth,
  authorizeMiddleware.admin,
  categoryController.createCategory
)

router.put('/update/:categoryId', tokenMiddleware.auth, authorizeMiddleware.admin, categoryController.updateCategory)

router.delete('/delete/:categoryId', tokenMiddleware.auth, authorizeMiddleware.admin, categoryController.deleteCategory)

export default router
