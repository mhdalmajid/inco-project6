const express = require('express')
const logOut = require('./logOut')
const index = require('./main')
const { login, loginPost } = require('./login')
const { ensureAuthenticated, forwardAuthenticated, adminProtection } = require('../auth/passport')
const { register, registerPost } = require('./register')
const location = require('./location')
const locationDetails = require('./locationDetails')
const { admin, approve } = require('./admin')
const commentPost = require('./comment')
const rate = require('./rate')
const userProfile = require('./userProfile')

const router = express.Router()

router.get('/', index)

router.use('/location', location)
router.get('/locationDetails/:id', locationDetails)

router.get('/admin', adminProtection, admin)
router.get('/approve/:id', adminProtection, approve)

router.get('/profile/:id', userProfile)

router.post('/comment', ensureAuthenticated, commentPost)

router.post('/rate', ensureAuthenticated, rate)

/** **************************************************************
 *****************************************************************
 ********************  Login System Routers   ********************
 *****************************************************************
 **************************************************************** */
router.get('/login', forwardAuthenticated, login)
router.post('/login', loginPost)
router.get('/register', register)
router.post('/register', registerPost)
router.get('/logout', ensureAuthenticated, logOut)

module.exports = router
