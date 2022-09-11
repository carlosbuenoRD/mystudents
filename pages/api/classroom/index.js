import nc from 'next-connect'
import { connect } from '@utils/db'
import response from '@utils/response'
import { ClassRoom } from '@models/classroom'
import { protect } from '../../../middlewares/authMiddlewares'

const handler = nc()

handler.use(protect)

// Get all classroom
handler.get(async (req, res) => {
  try {
    await connect()
    const classroom = await ClassRoom.find({})

    response(res, 200, classroom)
  } catch (error) {
    res.json(error.message)
  }
})

// Create a classroom
handler.post(async (req, res) => {
  try {
    await connect()
    const newClassroom = await ClassRoom.create(req.body)

    response(res, 201, newClassroom)
  } catch (error) {
    res.json(error.message)
  }
})

export default handler
