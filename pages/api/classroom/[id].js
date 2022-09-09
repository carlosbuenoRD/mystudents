import nc from 'next-connect'
import { Student, Calification } from '@models/students'
import { ClassRoom } from '@models/classroom'
import { connect, disconnect } from '@utils/db'
import response from '@utils/response'

const handler = nc()

// Delete
handler.delete(async (req, res) => {
  try {
    await connect()
    const classroom = await ClassRoom.findById(req.query.id)
    classroom.students.forEach(async (i) => {
      let student = await Student.findById(i._id)
      let califications = await Calification.find({ student: i._id })
      await student.remove()
      await califications.remove()
    })
    await classroom.remove()
    await disconnect()
    response(res, 204)
  } catch (error) {
    res.json(error.message)
  }
})

export default handler
