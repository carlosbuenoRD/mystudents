import nc from 'next-connect'
import { connect, disconnect } from '@utils/db'
import { subjects } from '@utils/data'
import response from '@utils/response'
import { Student, Calification } from '@models/students'

const handler = nc()

// Get all students
handler.get(async (req, res) => {
  try {
    await connect()
    const students = await Student.find({}).populate('califications')
    await disconnect()
    response(res, 200, students)
  } catch (error) {
    res.json(error.message)
  }
})

// Create a student
handler.post(async (req, res) => {
  const { name, lastname, classroom } = req.body

  try {
    await connect()
    const student = await Student.findOne({ name, lastname, classroom })
    if (student) {
      return response(
        res,
        400,
        `El estudiante ${name} ${lastname} ya esta registrado en el curso ${classroom}`
      )
    }
    const newStudent = await Student.create({ ...req.body })
    subjects.forEach(async (s) => {
      await Calification.create({
        student: newStudent._id,
        subject: s.title,
      })
    })
    await disconnect()
    response(res, 201, newStudent)
  } catch (error) {
    res.json(error.message)
  }
})

export default handler
