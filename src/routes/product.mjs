import express from 'express'
import { checkAuth, checkAdminRole } from '../middleware/middleware.auth.mjs'
import {
  createProduct,
  getAllProduct,
  createComment,
  getProductById,
  updateProductBasicById,
  updateProductAttributeById,
  updateProductOptionById,
  getComment,
} from '../controller/controller.product.mjs'

import { uploadMultiProduct, uploadSingleProduct } from '../controller/controller.upload.mjs'
import upload from '../middleware/upload.mjs'

const router = express.Router()

//Product
router.get('/', getAllProduct)
router.post('/', createProduct)

router.get('/:id', getProductById)
router.put('/:id', updateProductBasicById)
router.put('/:id/attribute', updateProductAttributeById)
router.put('/:id/option', updateProductOptionById)

//Images
router.post('/:id/image', upload.single('image'), uploadSingleProduct)
router.post('/:id/images', upload.array('images', 12), uploadMultiProduct)

//Comment
router.get('/:id/comment', getComment)
router.post('/:id/comment', checkAuth, createComment)

export default router
