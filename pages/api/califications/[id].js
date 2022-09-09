import nc from 'next-connect'
import { connect, disconnect } from '@utils/db'
import { subjects } from '@utils/data'
import response from '@utils/response'
import { Calification } from '@models/students'

const handler = nc()

// Get one grade
handler.get(async (req, res) => {
  try {
    await connect()
    const grade = await Calification.find({ student: req.query.id })
    await disconnect()
    response(res, 200, grade)
  } catch (error) {
    res.json(error.message)
  }
})

// Update Calification
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
