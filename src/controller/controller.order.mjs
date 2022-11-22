import Shipment from '../models/model.shipment.mjs'
import Cart from '../models/model.cart.mjs'
import Order from '../models/model.order.mjs'
import { getErrorMessages } from '../helper/errror.mjs'

const { invalidError, serverError } = getErrorMessages()

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('shipment')
    if (!orders) return res.status(404).send({ status: false, message: 'Orders not found' })
    return res.status(200).send({ status: true, orders: orders })
  } catch (error) {
    console.log(error)
    return serverError(res)
  }
}

export const confirmOrder = async (req, res) => {
  const { id } = req.params
  try {
    const order = await Order.findByIdAndUpdate(id, { status: 1 })
    if (!order) return res.status(404).send({ status: false, message: 'Order not found' })
    return res.status(200).send({ status: true, message: 'Order confirmed' })
  } catch (error) {
    return serverError(res)
  }
}

export const cancelOrder = async (req, res) => {
  const { id } = req.params
  try {
    const order = await Order.findByIdAndUpdate(id, { status: 2 })
    if (!order) return res.status(404).send({ status: false, message: 'Order not found' })
    return res.status(200).send({ status: true, message: 'Order canceled' })
  } catch (error) {
    return serverError(res)
  }
}

export const getOrderCustomer = async (req, res) => {
  const userId = res.customer._id

  try {
    const data = await Order.find({ userId }).populate('shipment')
    if (!data) return res.status(404).send({ status: false, message: 'Order not found' })
    return res.status(200).send({ status: true, data })
  } catch (error) {
    return serverError(res)
  }
}

export const addOrderCustomer = async (req, res) => {
  const userId = res.customer._id
  const { orderDetail, shipment, total } = req.body

  console.log(req.body)

  if (!orderDetail || !shipment || !total) return invalidError(res)
  try {
    const data = await Order.create({
      userId,
      orderDetail,
      shipment,
      total,
    })
    if (!data) return res.status(400).send({ status: false, message: 'Order not created' })
    return res.status(200).send({ status: true, message: 'Order created' })
  } catch (error) {
    return serverError(res)
  }
}
