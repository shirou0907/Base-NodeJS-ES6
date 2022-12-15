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

export const searchProductByName = async (req, res, next) => {
  const { name } = req.query
  try {
    const data = await Product.find({ name: { $regex: name, $options: 'i' }, active: true }).limit(10)
    if (data) {
      return res.status(200).send({ status: true, message: 'success', data: data })
    }
  } catch (error) {
    return serverError(res)
  }
}

export const getAllProductHome = async (req, res, next) => {
  let {
    page = 1,
    size = 2,
    orderBy = 'updatedAt',
    sort = 'desc',
    minPrice = 0,
    maxPrice = 1000000000000,
    p_color,
    p_size,
    tag,
  } = req.query
  page = parseInt(page)
  size = parseInt(size)

  console.log(req.query)

  const query = {
    active: true,
    price: { $gte: minPrice, $lte: maxPrice },
    'options.colors': { $regex: `#${p_color}`, $options: 'i' },
    'options.sizes': { $regex: p_size, $options: 'i' },
    tag: { $in: tag },
  }

  if (!tag) delete query['tag']
  if (!p_color) delete query['options.colors']
  if (!p_size) delete query['options.sizes']

  try {
    const data = await Product.find(query)
      .skip((page - 1) * size)
      .limit(size)
      .sort({ [orderBy]: sort })

    const totalRecord = await Product.find(query)

    if (data) {
      res.status(200).send({ status: true, message: 'success', data: data, total: totalRecord.length })
    }
  } catch (error) {
    return serverError(res)
  }
}

export const getAllProduct = async (req, res, next) => {
  let { page = 1, size = 2, orderBy = 'updatedAt', sort = 'desc', name } = req.query
  page = parseInt(page)
  size = parseInt(size)
  try {
    if (name) {
      console.log(name)
      const data = await Product.find({ name: { $regex: name, $options: 'i' }, active: true })
        .skip((page - 1) * size)
        .limit(size)
        .sort({ [orderBy]: sort })
      const totalRecord = await Product.find({ name: { $regex: name, $options: 'i' } })
      if (data) {
        return res.status(200).send({ status: true, message: 'success', data: data, total: totalRecord.length })
      }
    } else {
      console.log('else')
      const data = await Product.find({})
        .skip((page - 1) * size)
        .limit(size)
        .sort({ [orderBy]: sort })
      const totalRecord = await Product.find({}).estimatedDocumentCount()
      if (data) {
        return res.status(200).send({ status: true, message: 'success', data: data, total: totalRecord })
      }
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
      return res.status(200).send({ status: true, message: 'success', data: data })
    } else return notFoundError(res)
  } catch (error) {
    return serverError(res)
  }
}

export const updateProductBasicById = async (req, res, next) => {
  const productId = req.params.id

  const { name, code, options, description, tag, price, stock, status, weight, height, width, length, comments } =
    req.body

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
      options,
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

export const enableProductById = async (req, res, next) => {
  const productId = req.params.id
  try {
    const data = await Product.findByIdAndUpdate(productId, { active: true })
    if (data) {
      return res.json(data)
    } else return notFoundError(res)
  } catch (error) {
    return serverError(res)
  }
}

export const disableProductById = async (req, res, next) => {
  const productId = req.params.id
  try {
    const data = await Product.findByIdAndUpdate(productId, { active: false })
    if (data) {
      return res.json(data)
    } else return notFoundError(res)
  } catch (error) {
    return serverError(res)
  }
}

export const getComment = async (req, res, next) => {
  const productId = req.params.id
  try {
    const data = await Product.findOne({ _id: productId })
      .populate({
        path: 'comments',
        populate: { path: 'customer', select: 'email displayName photoURL -_id' },
      })
      .select('comments')

    if (data) {
      return res.status(200).send({ status: true, message: 'success', data: data.comments })
    }
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
