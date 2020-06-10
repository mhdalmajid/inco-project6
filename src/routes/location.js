const express = require('express')
const { isEmpty, isUndefined } = require('validator')
const upload = require('../config/multer')
const LocationModel = require('../models/location')

const router = express.Router()

const location = (req, res) => {
  res.render('locationForm', { user: req.user })
}

const locationPost = async (req, res, next) => {
  upload(req, res, async (err) => {
    const { name, description } = req.body

    if (isEmpty(req.body.name) || isEmpty(req.body.name) || req.file === undefined)
      return res.render('locationForm', {
        error_msg: 'all fields are required',
      })

    if (err)
      return res.render('locationForm', {
        error_msg: 'Oops! something went wrong! ',
      })

    const isNameExist = await LocationModel.findOne({ name })

    if (isNameExist)
      return res.render('locationForm', {
        error_msg: 'location name already exists',
        user: req.user,
      })

    const newLocation = new LocationModel({ name, description, fileName: req.file.filename })

    const save = await newLocation.save()

    return res.render('locationForm', {
      success_msg: 'File Uploaded!',
      file: `uploads/${req.file.filename}`,
      user: req.user,
    })
  })
}

router.get('/', location)
router.post('/', locationPost)

module.exports = router
