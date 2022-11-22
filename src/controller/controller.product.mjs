import Product from '../models/model.product.mjs'
import { roleAuth } from '../constants/index.mjs'
import { getErrorMessages } from '../helper/errror.mjs'

const { invalidError, notFoundError, serverError } = getErrorMessages()

export const createProduct = async (req, res, next) => {
  const {
    name,
    code,
    description,
    tag,
    attributes,
    options,
    images,
    price,
    stock,
    status,
    active,
    weight,
    height,
    width,
    length,
    comments,
  } = req.body

  if (!name || !price || !stock) {
    return invalidError(res)
  } else {
    try {
      const data = await Product.create({
        name,
        code,
        description,
        tag,
        attributes,
        options,
        images,
        price,
        stock,
        status,
        active,
        weight,
        height,
        width,
        length,
        comments,
      })
      if (data) {
        return res.json(data)
      }
      return invalidError(res)
    } catch (error) {
      return serverError(res)
    }
  }
}

export const getAllProduct = async (req, res, next) => {
  try {
    const data = await Product.find({})
    if (data) {
      return res.json(data)
    }
    return notFoundError(res)
  } catch (error) {
    return serverError(res)
  }
}

export const getProductById = async (req, res, next) => {
  const productId = req.params.id

  try {
    const data = await Product.findById(productId)
    if (data) {
      return res.json(data)
    } else return notFoundError(res)
  } catch (error) {
    return serverError(res)
  }
}

export const updateProductBasicById = async (req, res, next) => {
  const productId = req.params.id

  const { name, code, description, tag, price, stock, status, weight, height, width, length, comments } = req.body

  if (!name || !price || !stock) {
    return invalidError(res)
  }
  try {
    const data = await Product.findByIdAndUpdate(productId, {
      name,
      code,
      description,
      tag,
      price,
      stock,
      status,
      weight,
      height,
      width,
      length,
      comments,
    })
    if (data) {
      return res.json(data)
    } else return notFoundError(res)
  } catch (error) {
    return serverError(res)
  }
}

export const updateProductAttributeById = async (req, res, next) => {
  const productId = req.params.id
  const { attributes } = req.body
  if (!attributes) {
    return invalidError(res)
  }
  try {
    const data = await Product.findByIdAndUpdate(productId, { attributes })
    if (data) {
      return res.json(data)
    } else return notFoundError(res)
  } catch (error) {
    return serverError(res)
  }
}

export const updateProductOptionById = async (req, res, next) => {
  const productId = req.params.id
  const { options } = req.body
  if (!options) {
    return invalidError(res)
  }
  try {
    const data = await Product.findByIdAndUpdate(productId, { options })
    if (data) {
      return res.json(data)
    } else return notFoundError(res)
  } catch (error) {}
}

export const getComment = async (req, res, next) => {
  const productId = req.params.id
  try {
    const data = await Product.findOne({ _id: productId }).populate({
      path: 'comments',
      populate: { path: 'customer', select: 'email displayName photoURL -_id' },
    })
    res.json(data)
  } catch (error) {
    return serverError(res)
  }
}

export const createComment = async (req, res, next) => {
  const customer = res.customer._id
  const productId = req.params.id
  const { rate, comment } = req.body

  if (!comment) {
    return invalidError(res)
  }

  try {
    const data = await Product.findById(productId)
    if (data) {
      data.comments.push({ customer, rate, comment })
      await data.save()
      return res.json(data)
    } else return invalidError(res)
  } catch (error) {
    return serverError(res)
  }
}
