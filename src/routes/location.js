const express = require('express')
const path = require('path')
const fs = require('fs')
const multer = require('multer')

const router = express.Router()

const upload = multer({
  dest: '/temp',
})

const location = (req, res) => {
  res.render('locationForm')
}

const locationPost = (req, res) => {
  res.send(req.file)
}

// const locationPost = (req, res) => {
//     const tempPath = req.file.path
//     const targetPath = path.join(__dirname, './uploads/image.png')

//     if (path.extname(req.file.originalname).toLowerCase() === '.png') {
//       fs.rename(tempPath, targetPath, (err) => {
//         if (err) return 'error'

//         res.status(200).contentType('text/plain').end('File uploaded!')
//       })
//     } else {
//       fs.unlink(tempPath, (err) => {
//         if (err) return 'error'

//         res.status(403).contentType('text/plain').end('Only .png files are allowed!')
//       })
//     }
//   }

router.get('/', location)
router.post('/', upload.single('file'), locationPost)
module.exports = router
