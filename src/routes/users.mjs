import express from 'express'
import { login } from '../controller/controller.auth.mjs'
const router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.post('/login', login)

export default router
