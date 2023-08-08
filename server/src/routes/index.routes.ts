import express from 'express'
import userRoutes from './user.routes'
import blogRoutes from './blog.routes'
import mediaRoutes from './media.routes'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/blogs', blogRoutes)
router.use('/medias', mediaRoutes)

export default router
