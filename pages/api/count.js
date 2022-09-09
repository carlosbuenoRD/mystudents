import nc from 'next-connect'
import { connect, disconnect } from '@utils/db'
import { subjects } from '@utils/data'
import response from '@utils/response'
import { Student } from '@models/students'
import { ClassRoom } from '@models/classroom'

const handler = nc()

// Get all students
handler.get(async (req, res) => {
  try {
    await connect()
    const students = await Student.countDocuments()
    const classrooms = await ClassRoom.countDocuments()
    await disconnect()
    response(res, 200, { students, classrooms })
  } catch (error) {
    res.json(error.message)
  }
})

export default handler
