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
  disableProductById,
  enableProductById,
  getComment,
  getAllProductHome,
  searchProductByName,
} from '../controller/controller.product.mjs'

import { uploadMultiProduct, uploadSingleProduct } from '../controller/controller.upload.mjs'
import upload from '../middleware/upload.mjs'

const router = express.Router()

router.get('/home', getAllProductHome)

//Product
router.get('/', getAllProduct)
router.post('/', createProduct)

router.get('/search', searchProductByName)

router.get('/:id', getProductById)
router.put('/:id', checkAuth, checkAdminRole, updateProductBasicById)
router.put('/:id/attribute', checkAuth, checkAdminRole, updateProductAttributeById)
router.put('/:id/option', checkAuth, checkAdminRole, updateProductOptionById)

router.put('/:id/enabled', checkAuth, checkAdminRole, enableProductById)
router.put('/:id/disabled', checkAuth, checkAdminRole, disableProductById)

//Images
router.post('/:id/image', upload.single('image'), uploadSingleProduct)
router.post('/:id/images', upload.array('images', 12), uploadMultiProduct)

//Comment
router.get('/:id/comment', getComment)
router.post('/:id/comment', checkAuth, createComment)

export default router
