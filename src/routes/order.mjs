import express from 'express'
import { checkAdminRole, checkAuth } from '../middleware/middleware.auth.mjs'
import {
  countOrders,
  getAllOrders,
  confirmOrder,
  cancelOrder,
  getOrderCustomer,
  addOrderCustomer,
  getOrderById,
} from '../controller/controller.order.mjs'

const router = express.Router()

router.get('/customer', checkAuth, getOrderCustomer)
router.post('/customer', checkAuth, addOrderCustomer)

router.get('/count', checkAuth, checkAdminRole, countOrders)

router.get('/', checkAuth, checkAdminRole, getAllOrders)
router.get('/:id', checkAuth, checkAdminRole, getOrderById)
router.put('/:id/confirm', checkAuth, checkAdminRole, confirmOrder)
router.put('/:id/cancel', checkAuth, checkAdminRole, cancelOrder)

export default router
