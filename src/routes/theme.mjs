import express from 'express'
import { checkAuth, checkAdminRole } from '../middleware/middleware.auth.mjs'
import { getThemeStyle, updateThemeStyle } from '../controller/controller.theme.mjs'

import { uploadBannerTop, uploadBannerBottom, uploadSlides } from '../controller/controller.upload.mjs'
import upload from '../middleware/upload.mjs'

const router = express.Router()

//Images
router.post('/banner-top', upload.single('image'), uploadBannerTop)
router.post('/banner-bottom', upload.single('image'), uploadBannerBottom)
router.post('/slides', upload.array('images', 12), uploadSlides)

//Product
router.get('/', getThemeStyle)
router.post('/', checkAuth, checkAdminRole, updateThemeStyle)

export default router
