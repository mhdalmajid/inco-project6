const LocationModel = require('../models/location')

const commentPost = async (req, res) => {
  try {
    const { comment, userId, locationId } = req.body

    const location = await LocationModel.findOne({ _id: locationId })
    location.comments.push({ comment, userId })
    const save = await location.save()
    res.redirect(`/locationDetails/${locationId}#commentForm`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = commentPost
