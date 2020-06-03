const express = require('express')
const { login, loginPost } = require('./login')
const { register, registerPost } = require('./register')

const route = express.Router()

route.get('/', async (req, res) => res.render('index'))

route.get('/login', login)
route.post('/login', loginPost)

route.get('/register', register)
route.post('/register', registerPost)

module.exports = route
