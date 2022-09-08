import mongoose, { model, Schema } from 'mongoose'

const calificationSchema = new Schema({
  notebook: Number,
  homework: Number,
  practice: Number,
  participation: Number,
  test: Number,
  conduct: Number,
  subject: String,
  student: {
    type: Schema.Types.ObjectId,
    ref: 'students',
  },
})

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

export const Calification =
  mongoose.models.califications || model('califications', calificationSchema)
