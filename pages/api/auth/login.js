import nc from 'next-connect'
import { connect } from '@utils/db'
import { Auth } from '@models/auth'
import response from '@utils/response'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const handler = nc()

// Login
handler.post(async (req, res) => {
  try {
    await connect()
    const auth = await Auth.find({})
    if (!bcrypt.compareSync(req.body.password, auth[0].password)) {
      response(res, 400, 'La contraseña no coincide!')
      return
    }
    response(res, 200, {
      jwt: jwt.sign({ id: auth._id }, process.env.JWT_SECRET),
    })
  } catch (error) {
    res.json(error.message)
  }
})

export default handler
