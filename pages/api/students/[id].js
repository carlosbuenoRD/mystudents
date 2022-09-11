import nc from 'next-connect'
import { Student, Calification } from '@models/students'
import { ClassRoom } from '@models/classroom'
import { protect } from '../../../middlewares/authMiddlewares'
import { connect } from '@utils/db'
import response from '@utils/response'

const handler = nc()

handler.use(protect)

// Get one student
handler.get(async (req, res) => {
  try {
    await connect()
    const students = await Student.findById(req.query.id).populate(
      'califications'
    )

    response(res, 200, students)
  } catch (error) {
    res.json(error.message)
  }
})

// Update a student
handler.put(async (req, res) => {
  const { name, lastname, classroom } = req.body

  try {
    await connect()
    const student = await Student.findById(req.query.id)
    if (!student) {
      return response(res, 400, `No existe el estudiante`)
    }
    student.name = name
    student.lastname = lastname
    student.classroom = classroom
    await student.save()

    response(res, 200, student)
  } catch (error) {
    res.json(error.message)
  }
})

// Delete
handler.delete(async (req, res) => {
  try {
    await connect()
    let student = await Student.findById(req.query.id)
    let califications = await Calification.find({ student: student._id })
    await ClassRoom.updateOne(
      { _id: student.classroom },
      {
        $pull: {
          students: student._id,
        },
      }
    )
    console.log(califications)
    await student.remove()
    await califications.remove()

    response(res, 204)
  } catch (error) {
    res.json(error.message)
  }
})

export default handler
