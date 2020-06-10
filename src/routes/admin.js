const LocationModel = require('../models/location')

const admin = async (req, res) => {
  const locations = await LocationModel.find({ approved: false })
  res.render('admin', { locations, user: req.user })
}

const approve = async (req, res) => {
  const { id } = req.params
  const locations = await LocationModel.findOneAndUpdate({ _id: id }, { $set: { approved: true } })
  res.redirect('/admin')
}
module.exports = { admin, approve }
