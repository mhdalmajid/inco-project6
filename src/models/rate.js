const { Schema, model, Types } = require('mongoose')

const RateSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  locationId: { type: Types.ObjectId, ref: 'Location' },
  rate: { type: Boolean },
})

const RateModal = model('Rate', RateSchema)
module.exports = RateModal
