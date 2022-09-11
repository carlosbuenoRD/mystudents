import nc from 'next-connect'
import { connect } from '@utils/db'
import { Auth } from '@models/auth'
import response from '@utils/response'
import jwt from 'jsonwebtoken'

const handler = nc()

// Login
handler.post(async (req, res) => {
  try {
    await connect()
    const auth = await Auth.find({})
    if (req.body.question !== auth[0].securityQuestion.answer) {
      response(res, 400, 'La respuesta no coincide!')
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
