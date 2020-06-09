const { Schema, model } = require('mongoose')

const LocationSchema = new Schema(
  {
    fileName: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const Location = model('Location', LocationSchema)
module.exports = Location
