const { Schema, model, Types } = require('mongoose')

const Comment = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  comment: { type: String },
})

const LocationSchema = new Schema(
  {
    fileName: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    approved: { type: Boolean, default: false },
    comments: [Comment],
  },
  {
    timestamps: true,
  }
)

const Location = model('Location', LocationSchema)
module.exports = Location
