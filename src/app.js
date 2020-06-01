const express = require('express')
const session = require('express-session')
const logger = require('morgan')
const router = require('./routes/routes')
const { notFound, serverError } = require('./middleware/error')
const { SESSION_OPTIONS } = require('./config')

const createApp = (store) => {
  const app = express()

  app.disable('x-powered-by')

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use(session({ ...SESSION_OPTIONS, store }))

  app.use(router)

  app.use(logger('dev'))
  app.use(notFound)
  app.use(serverError)

  return app
}
module.exports = createApp
