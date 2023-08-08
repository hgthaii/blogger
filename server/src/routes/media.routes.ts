import express from 'express'
import mediaController from '~/controllers/media.controller'

const router = express.Router()

router.post('/upload-image', mediaController.uploadSigleImage)

export default router
