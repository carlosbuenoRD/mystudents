import nc from 'next-connect'
import { connect, disconnect } from '@utils/db'
import response from '@utils/response'
import { CheckList } from '@models/students'

const handler = nc()

// Get all list4
handler.get(async (req, res) => {
  let start = new Date(req.query.date)
  start.setHours(0, 0, 0, 0)

  let end = new Date(req.query.date)
  end.setHours(23, 59, 59, 59)

  try {
    await connect()
    const list = await CheckList.find({
      subject: req.query.subject,
      createdAt: { $gte: start, $lt: end },
    }).populate('list.student')
    await disconnect()
    response(res, 200, list)
  } catch (error) {
    res.json(error.message)
  }
})

// Create a list
handler.post(async (req, res) => {
  const { list, subject } = req.body

  try {
    await connect()
    const newList = await CheckList.create({ list, subject })
    await disconnect()
    response(res, 201, newList)
  } catch (error) {
    res.json(error.message)
  }
})

export default handler
