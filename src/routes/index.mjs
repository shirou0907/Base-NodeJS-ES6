import indexRouter from './home.mjs'
import usersRouter from './users.mjs'
import productRouter from './product.mjs'

import { getErrorMessages } from '../helper/errror.mjs'

const { notFoundError } = getErrorMessages()

export const useRoute = app => {
  app.use('/', indexRouter)

  app.use('/users', usersRouter)

  app.use('/product', productRouter)

  app.use((req, res, next) => {
    if (!req.route) return notFoundError(res)
    next()
  })
}
