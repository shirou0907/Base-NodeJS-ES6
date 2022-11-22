import express from 'express'
import { checkAdminRole, checkAuth } from '../middleware/middleware.auth.mjs'
import {
  getAllOrders,
  confirmOrder,
  cancelOrder,
  getOrderCustomer,
  addOrderCustomer,
} from '../controller/controller.order.mjs'

const router = express.Router()

router.get('/', checkAuth, checkAdminRole, getAllOrders)
router.put('/:id/confirm', checkAuth, checkAdminRole, confirmOrder)
router.put('/:id/cancel', checkAuth, checkAdminRole, cancelOrder)

router.get('/customer', checkAuth, getOrderCustomer)
router.post('/customer', checkAuth, addOrderCustomer)

export default router
