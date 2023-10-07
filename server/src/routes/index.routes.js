import { Router } from 'express'
import userRoutes from './user.routes.js'
import blogRoutes from './blog.routes.js'
import categoryRoutes from './category.routes.js'

const router = Router()

router.use('/user', userRoutes)
router.use('/blog', blogRoutes)
router.use('/category', categoryRoutes)

export default router
