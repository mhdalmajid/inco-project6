const LocationModel = require('../models/location')
const RateModel = require('../models/rate')

const locationDetails = async (req, res) => {
  const { id } = req.params
  let myRate = ''
  const location = await LocationModel.findById(id).populate('comments.userId', ['name', '_id'])
  const rate = await RateModel.find({ locationId: id, userId: req.user._id })
  const count = await RateModel.countDocuments({ locationId: location._id })

  if (rate && rate.length > 0) myRate = rate[0].rate

  res.render('locationDetails', {
    user: req.user,
    location,
    comments: location.comments,
    myRate,
    count,
  })
}
module.exports = locationDetails
