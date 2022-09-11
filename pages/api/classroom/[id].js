import nc from 'next-connect'
import { Student, Calification } from '@models/students'
import { ClassRoom } from '@models/classroom'
import { protect } from '../../../middlewares/authMiddlewares'
import { connect } from '@utils/db'
import response from '@utils/response'

const handler = nc()

handler.use(protect)

// Delete
handler.delete(async (req, res) => {
  try {
    await connect()
    const classroom = await ClassRoom.findById(req.query.id)
    classroom.students.forEach(async (i) => {
      let student = await Student.findById(i._id)
      let califications = await Calification.find({ student: i._id })
      califications.forEach(async (c) => {
        await c.remove()
      })
      await student.remove()
    })
    await classroom.remove()

    response(res, 204)
  } catch (error) {
    res.json(error.message)
  }
})

export default handler
