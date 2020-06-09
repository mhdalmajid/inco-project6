const express = require('express')
const logOut = require('./logOut')
const index = require('./main')
const { login, loginPost } = require('./login')
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/passport')
const { register, registerPost } = require('./register')
const location = require('./location')

const router = express.Router()

router.get('/', index)

router.get('/login', forwardAuthenticated, login)
router.post('/login', loginPost)

router.get('/register', register)
router.post('/register', registerPost)

// Logout
router.get('/logout', ensureAuthenticated, logOut)

router.use('/location', location)

module.exports = router
