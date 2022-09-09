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

const checkListSchema = new Schema(
  {
    subject: String,
    list: [
      {
        student: {
          type: Schema.Types.ObjectId,
          ref: 'students',
        },
        present: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  }
)

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
  califications: [
    {
      type: Schema.Types.ObjectId,
      ref: 'califications',
    },
  ],
})

export const Student =
  mongoose.models.students || model('students', studentSchema)

export const Calification =
  mongoose.models.califications || model('califications', calificationSchema)

export const CheckList =
  mongoose.models.checklist || model('checklist', checkListSchema)
