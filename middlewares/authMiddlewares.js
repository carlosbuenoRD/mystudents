import jwt from 'jsonwebtoken'
import { Auth } from '@models/auth'
import response from '@utils/response'
import { connect } from '@utils/db'

export const protect = async (req, res, next) => {
  let token
  let decoded
  let authorization = req.headers.authorization
  try {
    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1]
      decoded = await decodeToken(token)
      await connect()
      req.user = await Auth.findById(decoded.id).select('-password')
      next()
    } else if (!token) {
      response(res, 401, 'No authorization, no token')
    } else {
      response(res, 401, 'No authorize')
    }
  } catch (error) {
    response(res, 400, error.message)
  }
}

const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
