import express from 'express'
import { checkAuth, checkAdminRole } from '../middleware/middleware.auth.mjs'

const router = express.Router()

router.get('/', checkAuth, checkAdminRole, function (req, res, next) {
  res.json('home')
})

export default router
