import nc from 'next-connect'
import { Student } from '@models/students'
import { connect, disconnect } from '@utils/db'
import response from '@utils/response'

const handler = nc()

// Update a student
handler.put(async (req, res) => {
  const { notebook, homework, practice, participation, test } = req.body

  try {
    await connect()
    const student = await Student.findById(req.query.id)
    if (!student) {
      return response(res, 400, `No existe el estudiante`)
    }
    student.calification.notebook = notebook
    student.calification.homework = homework
    student.calification.participation = participation
    student.calification.practice = practice
    student.calification.test = test
    await student.save()
    await disconnect()
    response(res, 200, student)
  } catch (error) {
    res.json(error.message)
  }
})

export default handler
