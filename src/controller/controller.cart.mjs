import { isValidObjectId } from 'mongoose'
import Cart from '../models/model.cart.mjs'
import Customer from '../models/model.customer.mjs'
import Product from '../models/model.product.mjs'

export const countCart = async (req, res) => {
  const userId = res.customer._id
  const data = await Cart.findOne({ userId: userId })
  if (!data) return res.status(200).send({ status: true, message: 'success', data: 0 })
  return res.status(200).send({ status: true, message: 'success', data: data.products.length })
}

export const addItemToCart = async (req, res) => {
  let userId = res.customer._id
  let user = await Customer.exists({ _id: userId })

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: 'Invalid user' })

  let productId = req.body.productId
  if (!productId) return res.status(400).send({ status: false, message: 'Invalid product' })

  const checkProduct = await Product.findOne({ _id: productId })
  if (!checkProduct) {
    return res.status(400).send({ status: false, message: 'Invalid product' })
  } else {
    let cart = await Cart.findOne({ userId: userId })
    if (cart) {
      let itemIndex = cart.products.findIndex(p => p.productId == productId)

      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex]
        productItem.quantity += 1
        cart.products[itemIndex] = productItem
      } else {
        cart.products.push({ productId: productId, quantity: 1 })
      }
      cart = await cart.save()
      return res.status(200).send({ status: true, updatedCart: cart })
    } else {
      const newCart = await Cart.create({
        userId,
        products: [{ productId: productId, quantity: 1 }],
      })

      return res.status(201).send({ status: true, newCart: newCart })
    }
  }
}

export const getCart = async (req, res) => {
  let userId = res.customer._id
  let user = await Customer.exists({ _id: userId })

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: 'Invalid user ID' })

  let cart = await Cart.findOne({ userId: userId }).populate({
    path: 'products',
    populate: { path: 'productId', select: 'name price stock mainImage' },
  })
  if (!cart) return res.status(200).send({ status: true, message: 'success', data: null })

  let total = 0
  if (cart.products.length > 0) {
    cart.products.forEach(product => {
      total += product.productId.price * product.quantity
    })
  }

  cart.total = total
  await cart.save()

  return res.status(200).send({ status: true, message: 'success', data: cart })
}

export const decreaseQuantity = async (req, res) => {
  let userId = res.customer._id
  let user = await Customer.exists({ _id: userId })
  let productId = req.body.productId

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: 'Invalid user ID' })

  let cart = await Cart.findOne({ userId: userId })
  if (!cart) return res.status(404).send({ status: false, message: 'Cart not found for this user' })

  let itemIndex = cart.products.findIndex(p => p.productId == productId)

  if (itemIndex > -1) {
    let productItem = cart.products[itemIndex]
    productItem.quantity -= 1
    if (productItem.quantity < 1) {
      cart.products.splice(itemIndex, 1)
    } else {
      cart.products[itemIndex] = productItem
    }
    cart = await cart.save()
    return res.status(200).send({ status: true, updatedCart: cart })
  }
  res.status(400).send({ status: false, message: 'Item does not exist in cart' })
}

export const removeItem = async (req, res) => {
  let userId = res.customer._id
  let user = await Customer.exists({ _id: userId })
  let productId = req.body.productId

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: 'Invalid user ID' })

  let cart = await Cart.findOne({ userId: userId })
  if (!cart) return res.status(404).send({ status: false, message: 'Cart not found for this user' })

  let length = cart.products.length
  if (length == 1) {
    cart = await Cart.deleteOne({ _id: cart._id })
    return res.status(200).send({ status: true, updatedCart: cart })
  }

  let itemIndex = cart.products.findIndex(p => p.productId == productId)
  if (itemIndex > -1) {
    cart.products.splice(itemIndex, 1)
    cart = await cart.save()

    return res.status(200).send({ status: true, updatedCart: cart })
  }
  res.status(400).send({ status: false, message: 'Item does not exist in cart' })
}

export const removeCart = async (req, res) => {
  const cartId = req.params.id

  if (!cartId || !isValidObjectId(cartId)) return res.status(400).send({ status: false, message: 'Invalid cart ID' })

  const data = await Cart.deleteOne({ _id: cartId })

  if (data.deletedCount === 0) {
    return res.status(404).send({ status: false, message: 'Cart not found' })
  }
  res.status(200).send({ status: true, message: 'Cart deleted successfully' })
}
