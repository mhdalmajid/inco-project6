const express = require('express')
const session = require('express-session')
const logger = require('morgan')
const path = require('path')
const exphbs = require('express-handlebars')
const compression = require('compression')
const router = require('./routes/routes')
const { notFound, serverError } = require('./middleware/error')
const { hbsHelpers } = require('./helpers/handlebarHelpers')
const { SESSION_OPTIONS } = require('./config')

const createApp = (store) => {
  const app = express()

  app.disable('x-powered-by')

  app.use(compression())

  const hbs = exphbs.create({
    extname: '.hbs',
    helpers: hbsHelpers,
    partialsDir: path.join(__dirname, 'views/partials'),
  })

  app.engine('hbs', hbs.engine)
  app.set('view engine', 'hbs')
  app.set('views', path.resolve(__dirname, 'views'))
  app.use(express.static(path.join(__dirname, 'public')))

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
