import express from 'express'
import { checkAuth } from '../middleware/middleware.auth.mjs'
import { addItemToCart, decreaseQuantity, getCart, removeItem } from '../controller/controller.cart.mjs'

const router = express.Router()

router.get('/', checkAuth, getCart)
router.post('/', checkAuth, addItemToCart)
router.put('/', checkAuth, decreaseQuantity)
router.delete('/', checkAuth, removeItem)

export default router
