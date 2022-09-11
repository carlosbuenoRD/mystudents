import mongoose, { model, Schema } from 'mongoose'

const authSchema = new Schema({
  password: String,
  securityQuestion: {
    question: String,
    answer: String,
  },
})

export const Auth = mongoose.models.auth || model('auth', authSchema)
