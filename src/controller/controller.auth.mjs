import jwt from 'jsonwebtoken'
import Customer from '../models/model.customer.mjs'
import { roleAuth } from '../constants/index.mjs'
import { getErrorMessages } from '../helper/errror.mjs'
import cookieParser from 'cookie-parser'
const secretKey = process.env.JWT_SECRET

const { invalidError, serverError } = getErrorMessages()

const createToken = (data, res) => {
  jwt.sign({ _id: data._id.toString() }, secretKey, (err, token) => {
    if (!err) {
      console.log('success', token)
      return res.json({
        token,
        message: 'Đăng nhập thành công',
      })
    }
  })
}

export const getProfile = async uid => {
  const customer = await Customer.findOne({ uid })
  return customer
}

export const login = async (req, res, next) => {
  const role = roleAuth.CUSTOMER

  const { uid, email, emailVerified, displayName, isAnonymous, photoURL } = req.body

  try {
    if (uid) {
      const data = await getProfile(uid)
      if (!data) {
        try {
          const customer = await Customer.create({
            uid,
            email,
            role,
            emailVerified,
            displayName,
            isAnonymous,
            photoURL,
          })

          if (customer) {
            return createToken(customer, res)
          }
        } catch (error) {
          return serverError(res)
        }
      }
      return createToken(data, res)
    } else {
      return invalidError(res)
    }
  } catch (error) {
    return serverError(res)
  }
}
