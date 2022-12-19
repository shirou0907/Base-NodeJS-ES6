import express from 'express'
import { checkAuth, checkAdminRole } from '../middleware/middleware.auth.mjs'
import { getCountDasboard } from '../controller/controller.statisic.mjs'

const router = express.Router()

router.get('/', checkAuth, checkAdminRole, function (req, res, next) {
  res.json('home')
})

router.get('/dashboard', checkAuth, checkAdminRole, getCountDasboard)

export default router
