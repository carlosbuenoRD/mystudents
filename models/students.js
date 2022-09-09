import mongoose, { model, Schema } from 'mongoose'

const calificationSchema = new Schema({
  notebook: { type: Number, default: 0 },
  homework: { type: Number, default: 0 },
  practice: { type: Number, default: 0 },
  participation: { type: Number, default: 0 },
  test: { type: Number, default: 0 },
  conduct: { type: Number, default: 0 },
  subject: String,
  student: {
    type: Schema.Types.ObjectId,
    ref: 'students',
  },
})

const checkListSchema = new Schema(
  {
    subject: String,
    classroom: {
      type: Schema.Types.ObjectId,
      ref: 'classroom',
    },
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
    type: Schema.Types.ObjectId,
    ref: 'classroom',
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
