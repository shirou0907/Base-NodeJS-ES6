import jwt from 'jsonwebtoken'
import Customer from '../models/model.customer.mjs'
import { roleAuth } from '../constants/index.mjs'
import { getErrorMessages } from '../helper/errror.mjs'
const secretKey = process.env.JWT_SECRET

const { unAuthorizationError, accessDeniedError } = getErrorMessages()

export const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return unAuthorizationError(res)
  }
  try {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (!err) {
        const { _id } = decoded
        Customer.findOne({ _id }).then(data => {
          if (data) {
            res.customer = data
            return next()
          }

          return unAuthorizationError(res)
        })
      } else {
        return unAuthorizationError(res)
      }
    })
  } catch (error) {
    return unAuthorizationError(res)
  }
}

export const checkAdminRole = async (req, res, next) => {
  const { role } = res.customer
  if (role === roleAuth.ADMIN) {
    return next()
  } else {
    return accessDeniedError(res)
  }
}
