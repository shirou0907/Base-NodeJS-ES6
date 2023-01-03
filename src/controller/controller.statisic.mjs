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

export const groupByMonth = async (req, res) => {
  let { year = new Date().getFullYear() } = req.query
  year = parseInt(year)
  console.log(year)
  const order = await Order.aggregate([
    {
      $group: {
        _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
        total: { $sum: { $toInt: '$total' } },
      },
    },
  ])
  const result = order.filter(item => item._id.year === year)

  if (order) return res.status(200).send({ data: result })
  return serverError(res)
}

export const countCustomer = async (req, res) => {
  let { year = new Date().getFullYear() } = req.query
  year = parseInt(year)
  const cus = await Customer.aggregate([
    {
      $group: {
        _id: { month: { $month: '$updatedAt' }, year: { $year: '$updatedAt' } },
        total: { $sum: 1 },
      },
    },
  ])
  const result = cus.filter(item => item._id.year === year)
  if (cus) return res.status(200).send({ data: result })
  return serverError(res)
}
