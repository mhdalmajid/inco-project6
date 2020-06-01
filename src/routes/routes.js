/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const express = require('express')

const route = express.Router()

route.get('/', async (req, res) => res.send('Hello World'))

module.exports = route
