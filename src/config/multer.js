const multer = require('multer')
const path = require('path')

const { diskStorage } = multer
const filetypes = /jpeg|jpg|png|gif/
const destination = './src/public/uploads/'

const filename = (req, file, cb) => {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
    file.originalname
  )}`
  cb(null, `${file.fieldname}-${uniqueSuffix}`)
}

const fileFilter = (req, file, cb) => {
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) return cb(null, true)

  cb('Error: Images Only!')
}

let storage = diskStorage({
  destination,
  filename,
})

let upload = multer({
  storage,
  //   limits: { fileSize: 1000000 },
  fileFilter,
}).single('file')

module.exports = upload
