import mongoose, { model, Schema } from 'mongoose'

const classRoomSchema = new Schema({
  name: String,
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'students',
    },
  ],
})

export const ClassRoom =
  mongoose.models.classroom || model('classroom', classRoomSchema)
