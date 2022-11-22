import express from 'express'
import { login } from '../controller/controller.auth.mjs'
import { checkAuth, checkAdminRole } from '../middleware/middleware.auth.mjs'
import {
  getAllCustomers,
  getShippingAddress,
  addShippingAddress,
  deleteShippingAddress,
} from '../controller/controller.customer.mjs'
const router = express.Router()

router.post('/login', login)
router.post('/logout', (req, res) => {
  res.json('logout')
})
router.get('/get-all', checkAuth, checkAdminRole, getAllCustomers)

router.get('/shipment', checkAuth, getShippingAddress)
router.post('/shipment', checkAuth, addShippingAddress)
router.delete('/shipment/:id', checkAuth, deleteShippingAddress)

export default router
