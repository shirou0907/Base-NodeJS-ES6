import Shipment from '../models/model.shipment.mjs'
import Cart from '../models/model.cart.mjs'
import Order from '../models/model.order.mjs'
import Product from '../models/model.product.mjs'
import { getErrorMessages } from '../helper/errror.mjs'

const { invalidError, serverError } = getErrorMessages()

export const countOrders = async (req, res, next) => {
  try {
    const all = await Order.countDocuments()
    const wait = await Order.countDocuments({ status: 0 })
    const process = await Order.countDocuments({ status: 1 })
    const cancel = await Order.countDocuments({ status: 2 })
    return res.status(200).send({ status: true, message: 'success', data: { all, wait, process, cancel } })
  } catch (error) {
    return serverError(res)
  }
}

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params
    const order = await Order.findOne({ _id: id })
      .populate('shipment')
      .populate({
        path: 'orderDetail',
        populate: { path: 'productId', select: 'name price mainImage' },
      })
    if (!order) return invalidError(res)
    return res.status(200).send({ status: true, message: 'success', data: order })
  } catch (error) {
    return serverError(res)
  }
}

export const getAllOrders = async (req, res) => {
  let { page = 1, size = 2, orderBy = 'updatedAt', sort = 'desc', status } = req.query
  page = parseInt(page)
  size = parseInt(size)
  try {
    if (status) {
      const data = await Order.find({ status: status })
        .populate('shipment')
        .populate({
          path: 'orderDetail',
          populate: { path: 'productId', select: 'name price mainImage' },
        })

        .skip((page - 1) * size)
        .limit(size)
        .sort({ [orderBy]: sort })
      const totalRecord = await Order.find({ status: status })
      if (data) {
        return res.status(200).send({ status: true, message: 'success', data: data, total: totalRecord.length })
      }
    } else {
      const data = await Order.find({})
        .populate('shipment')
        .populate({
          path: 'orderDetail',
          populate: { path: 'productId', select: 'name price mainImage' },
        })
        .skip((page - 1) * size)
        .limit(size)
        .sort({ [orderBy]: sort })
      const totalRecord = await Order.find({})
      if (data) {
        return res.status(200).send({ status: true, message: 'success', data: data, total: totalRecord.length })
      }
    }
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
    const data = await Order.find({ userId })
      .populate('shipment')
      .populate({
        path: 'orderDetail',
        populate: { path: 'productId', select: 'name price mainImage' },
      })
    if (!data) return res.status(404).send({ status: false, message: 'Order not found' })
    return res.status(200).send({ status: true, data })
  } catch (error) {
    return serverError(res)
  }
}

export const addOrderCustomer = async (req, res) => {
  const userId = res.customer._id
  const { orderDetail, shipment, total, note } = req.body

  if (!orderDetail || !shipment || !total) return invalidError(res)
  try {
    const data = await Order.create({
      userId,
      orderDetail,
      shipment,
      total,
      note,
    })
    for (let product of orderDetail) {
      const quantity = await Product.findById(product.productId)
      if (quantity.stock < product.quantity) {
        console.log(quantity.stock)
        return res.status(400).send({ status: false, message: 'Quantity not enough' })
      }
    }

    for (let product of orderDetail) {
      await Product.findByIdAndUpdate(product.productId, { $inc: { stock: -product.quantity } })
    }

    if (!data) return res.status(400).send({ status: false, message: 'Order not created' })
    return res.status(200).send({ status: true, message: 'Order created' })
  } catch (error) {
    return serverError(res)
  }
}
