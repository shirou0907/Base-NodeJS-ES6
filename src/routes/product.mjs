import express from 'express'
import { checkAuth, checkAdminRole } from '../middleware/middleware.auth.mjs'
import {
  createProduct,
  getAllProduct,
  createComment,
  getProductById,
  getComment,
} from '../controller/controller.product.mjs'

const router = express.Router()

//Product
router.get('/', getAllProduct)
router.post('/', createProduct)

router.get('/:id', getProductById)

//Comment
router.get('/:id/comment', getComment)
router.post('/:id/comment', checkAuth, createComment)

export default router
