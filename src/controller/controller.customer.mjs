import Customer from '../models/model.customer.mjs'
import Shipment from '../models/model.shipment.mjs'
import { getErrorMessages } from '../helper/errror.mjs'

const { invalidError, serverError } = getErrorMessages()

export const getAllCustomers = async (req, res) => {
  let { page = 1, size = 2 } = req.query
  page = parseInt(page)
  size = parseInt(size)
  try {
    const customers = await Customer.find({})
      .sort({ role: 'asc', createdAt: 'desc' })
      .skip((page - 1) * size)
      .limit(size)

    const totalRecord = await Customer.find({}).estimatedDocumentCount()

    return res.status(200).send({ status: true, message: 'success', data: customers, total: totalRecord })
  } catch (error) {
    return res.status(500).json(serverError)
  }
}

export const addShippingAddress = async (req, res) => {
  const userId = res.customer._id
  let { userName, userPhone, address, wardName, districtName, provinceName } = req.body

  if (!userId) {
    return invalidError(res)
  }

  if (!userName) {
    userName = res.customer.displayName
  }
  try {
    const data = await Shipment.create({
      userId,
      userName,
      userPhone,
      address,
      wardName,
      districtName,
      provinceName,
    })
    if (data) {
      return res.json({
        data,
        message: 'Thêm địa chỉ thành công',
      })
    }
  } catch (error) {
    return serverError(res)
  }
}

export const getShippingAddress = async (req, res) => {
  const userId = res.customer._id
  if (!userId) {
    return invalidError(res)
  }
  try {
    const data = await Shipment.find({ userId, active: true })
    if (data) {
      return res.json(data)
    }
  } catch (error) {
    return serverError(res)
  }
}

export const deleteShippingAddress = async (req, res) => {
  const userId = res.customer._id
  const { id } = req.params
  if (!userId) {
    return invalidError(res)
  }
  try {
    const data = await Shipment.findByIdAndUpdate({ _id: id }, { active: false })
    if (data) {
      return res.json({
        data,
        message: 'Xóa địa chỉ thành công',
      })
    }
  } catch (error) {
    return serverError(res)
  }
}
