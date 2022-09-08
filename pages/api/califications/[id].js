import nc from 'next-connect'
import { connect, disconnect } from '@utils/db'
import { subjects } from '@utils/data'
import response from '@utils/response'
import { Calification } from '@models/students'

const handler = nc()

// Get all students
handler.put(async (req, res) => {
  const { notebook, participation, conduct, test, homework, practice } =
    req.body

  try {
    await connect()
    const calification = await Calification.findById(req.query.id).populate(
      'student'
    )
    calification.notebook = notebook
    calification.participation = participation
    calification.conduct = conduct
    calification.test = test
    calification.homework = homework
    calification.practice = practice
    await calification.save()
    await disconnect()
    response(res, 200, calification)
  } catch (error) {
    res.json(error.message)
  }
})

export default handler
