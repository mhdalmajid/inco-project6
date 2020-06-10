const LocationModel = require('../models/location')

const index = async (req, res) => {
  const locations = await LocationModel.find({ approved: true })

  res.render('index', { locations, user: req.user })
}

module.exports = index
