const express = require('express')
const login = require('./login')

const route = express.Router()

route.get('/', async (req, res) => res.render('index'))

route.get('/login', async (req, res) => res.render('login'))
route.get('/register', async (req, res) => res.render('register'))
module.exports = route
