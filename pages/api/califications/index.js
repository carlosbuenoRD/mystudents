import nc from 'next-connect'
import { connect, disconnect } from '@utils/db'
import { protect } from '../../../middlewares/authMiddlewares'
import response from '@utils/response'
import { Calification } from '@models/students'

const handler = nc()

handler.use(protect)

// Get all grades
handler.get(async (req, res) => {
  try {
    await connect()
    const grades = await Calification.find({
      subject: req.query.subject,
    }).populate('student')

    response(res, 200, grades)
  } catch (error) {
    res.json(error.message)
  }
})

export default handler
