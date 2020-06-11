const RateModal = require('../models/rate')

const rate = async (req, res) => {
  const { userId, locationId } = req.body
  const rateRaw = await RateModal.findOne({ userId, locationId })

  if (rateRaw) {
    const removed = await RateModal.deleteOne({ userId, locationId }, { rate: !rateRaw.rate })
    return res.send(removed)
  }
  const newRate = new RateModal({ userId, locationId, rate: true })
  const save = await newRate.save()
  return res.send(save)
}

module.exports = rate
