import { connect, disconnect } from '@utils/db'

export default async function handler(req, res) {
  await connect()
  await disconnect()
  res.status(200).json({ name: 'John Doe' })
}
