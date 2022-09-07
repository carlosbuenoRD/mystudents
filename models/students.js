import mongoose, { model, Schema } from 'mongoose'

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  classroom: {
    type: String,
    required: true,
  },
  calification: {
    notebook: Number,
    homework: Number,
    Practice: Number,
    participation: Number,
    test: Number,
  },
})

export const Student =
  mongoose.models.students || model('students', studentSchema)
