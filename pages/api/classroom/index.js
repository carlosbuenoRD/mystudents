import nc from 'next-connect'
import { connect, disconnect } from '@utils/db'
import response from '@utils/response'
import { ClassRoom } from '@models/classroom'

const handler = nc()

// Get all classroom
handler.get(async (req, res) => {
  try {
    await connect()
    const classroom = await ClassRoom.find({})
    await disconnect()
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
    await disconnect()
    response(res, 201, newClassroom)
  } catch (error) {
    res.json(error.message)
  }
})

export default handler
