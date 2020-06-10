const UserModel = require('../models/user')

const userProfile = async (req, res) => {
  const { id } = req.params
  const userDetails = await UserModel.findById(id)

  res.render('userProfile', { user: req.user, userDetails })
}

module.exports = userProfile
