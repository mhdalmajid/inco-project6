const LocationModel = require('../models/location')
const RateModel = require('../models/rate')

const locationDetails = async (req, res) => {
  try {
    const { id } = req.params
    let myRate = ''
    const location = await LocationModel.findById(id).populate('comments.userId', ['name'])
    let findUserRate = req.user ? { locationId: id, userId: req.user._id } : { locationId: id }
    const rate = await RateModel.findOne(findUserRate)
    const count = await RateModel.countDocuments({ locationId: id })

    if (rate !== null) myRate = rate
    console.log(rate)
    res.render('locationDetails', {
      user: req.user,
      location,
      comments: location.comments,
      myRate,
      count,
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = locationDetails
