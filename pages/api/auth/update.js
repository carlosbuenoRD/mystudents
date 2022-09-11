import nc from 'next-connect'
import { connect } from '@utils/db'
import { Auth } from '@models/auth'
import { protect } from 'middlewares/authMiddlewares'
import response from '@utils/response'
import bcrypt from 'bcryptjs'

const handler = nc()

handler.use(protect)

// Login
handler.put(async (req, res) => {
  const { oldPassword, newPassword, answer } = req.body

  try {
    await connect()
    const auth = await Auth.find({})
    if (!bcrypt.compareSync(oldPassword, auth[0].password)) {
      response(res, 400, 'Vieja contraseña incorrecta!')
      return
    }
    auth[0].password = bcrypt.hashSync(newPassword, 10)
    auth[0].securityQuestion.answer = answer || auth[0].securityQuestion.answer
    await auth[0].save()
    response(res, 200, 'Contraseña actualizada')
  } catch (error) {
    res.json(error.message)
  }
})

export default handler
