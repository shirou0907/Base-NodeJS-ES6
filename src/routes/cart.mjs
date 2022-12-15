import express from 'express'
import { checkAuth } from '../middleware/middleware.auth.mjs'
import {
  addItemToCart,
  decreaseQuantity,
  getCart,
  removeItem,
  removeCart,
  countCart,
} from '../controller/controller.cart.mjs'

const router = express.Router()

router.get('/count', checkAuth, countCart)
router.delete('/all/:id', checkAuth, removeCart)
router.get('/', checkAuth, getCart)
router.post('/', checkAuth, addItemToCart)
router.put('/', checkAuth, decreaseQuantity)
router.delete('/', checkAuth, removeItem)

export default router
