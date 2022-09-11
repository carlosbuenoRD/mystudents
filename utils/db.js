import mongoose from 'mongoose'
import '@models/students'

let connection = {}

export const connect = async () => {
  if (connection.isConnected) {
    console.log('DB ALREADY CONNECTED!')
    return
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState
    if (connection.isConnected === 1) {
      console.log('Connected to previus connection')
      return
    }

    await mongoose.disconnect()
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  connection.isConnected = db.connections[0].readyState
  console.log('New db connection')
}
