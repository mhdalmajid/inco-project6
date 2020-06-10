const RateModal = require('../models/rate')

const rate = async (req, res) => {
  const { userId, locationId } = req.body
  const location = await RateModal.findOne({ userId, locationId })
  if (location) {
    const update = await RateModal.updateOne({ userId, locationId }, { rate: !location.rate })
    return res.send(update)
  }
  const newRate = new RateModal({ userId, locationId, rate: true })
  const save = await newRate.save()
  return res.send(save)
}

module.exports = rate
