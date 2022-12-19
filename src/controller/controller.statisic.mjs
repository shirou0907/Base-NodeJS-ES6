import Customer from '../models/model.customer.mjs'
import Product from '../models/model.product.mjs'
import Order from '../models/model.order.mjs'

import { getErrorMessages } from '../helper/errror.mjs'

const { invalidError, serverError } = getErrorMessages()

export const getCountDasboard = async (req, res) => {
  const customer = await Customer.countDocuments()
  const product = await Product.countDocuments()
  const order = await Order.countDocuments()

  if (customer && product && order) return res.status(200).send({ data: { customer, product, order } })
  return serverError(res)
}
