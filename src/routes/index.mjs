import indexRouter from './home.mjs'
import cartRouter from './cart.mjs'
import productRouter from './product.mjs'
import usersRouter from './users.mjs'
import orderRouter from './order.mjs'
import tagRouter from './tag.mjs'
import themeRouter from './theme.mjs'

import { getErrorMessages } from '../helper/errror.mjs'

const { customError } = getErrorMessages()

export const useRoute = app => {
  app.use('/', indexRouter)

  app.use('/users', usersRouter)

  app.use('/product', productRouter)

  app.use('/cart', cartRouter)

  app.use('/order', orderRouter)

  app.use('/tag', tagRouter)

  app.use('/theme', themeRouter)

  app.use((req, res, next) => {
    if (!req.route) return customError(res, 'API not found', 404)
    next()
  })
}
