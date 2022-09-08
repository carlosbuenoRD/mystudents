import nc from 'next-connect'
import { connect, disconnect } from '@utils/db'
import { subjects } from '@utils/data'
import response from '@utils/response'
import { Calification } from '@models/students'

const handler = nc()

// Get all students
handler.get(async (req, res) => {
  try {
    await connect()
    const grades = await Calification.find({
      subject: req.query.subject,
    }).populate('student')
    await disconnect()
    response(res, 200, grades)
  } catch (error) {
    res.json(error.message)
  }
})

export default handler
