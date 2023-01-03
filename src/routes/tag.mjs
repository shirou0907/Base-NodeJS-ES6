import express from 'express'
import { checkAuth } from '../middleware/middleware.auth.mjs'
import { getAllTag, addNewTag, updateTag, disableTag, enableTag } from '../controller/controller.tag.mjs'

const router = express.Router()

router.get('/',  getAllTag)
router.post('/', checkAuth, addNewTag)
router.put('/:id', checkAuth, updateTag)
router.put('/:id/enabled', checkAuth, enableTag)
router.put('/:id/disabled', checkAuth, disableTag)

export default router
