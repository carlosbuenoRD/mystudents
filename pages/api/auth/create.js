import nc from 'next-connect'
import { connect } from '@utils/db'
import { Auth } from '@models/auth'
import response from '@utils/response'
import bcrypt from 'bcryptjs'

const handler = nc()

// create
handler.post(async (req, res) => {
  try {
    await connect()
    const auth = await Auth.create({
      password: bcrypt.hashSync('123456', 10),
      securityQuestion: {
        question: 'Como se llama la primera niet@ de tu abuela?',
        answer: 'maria isabella',
      },
    })

    response(res, 201, auth)
  } catch (error) {
    res.json(error.message)
  }
})

export default handler
