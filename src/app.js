const express = require('express')
const session = require('express-session')
const logger = require('morgan')
const path = require('path')
const flash = require('connect-flash')
const exphbs = require('express-handlebars')
const passport = require('passport')
const compression = require('compression')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const router = require('./routes/routes')
const { notFound, serverError } = require('./middleware/error')
const { hbsHelpers } = require('./helpers/handlebarHelpers')
const { SESSION_OPTIONS } = require('./config')
const { passportConfig } = require('./auth/passport')

const createApp = (store) => {
  const app = express()

  // initialize passport for authentication
  passportConfig(passport)

  app.disable('x-powered-by')

  app.use(compression())

  const hbs = exphbs.create({
    extname: '.hbs',
    helpers: hbsHelpers,
    partialsDir: path.join(__dirname, 'views/partials'),
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })

  app.engine('hbs', hbs.engine)
  app.set('view engine', 'hbs')
  app.set('views', path.resolve(__dirname, 'views'))
  app.use(express.static(path.join(__dirname, 'public')))

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(session({ ...SESSION_OPTIONS, store }))
  app.use(flash())
  app.use(passport.initialize())
  app.use(passport.session())

  // // Global variables
  // app.use(function (req, res, next) {
  //   res.locals.success_msg = req.flash('success_msg')
  //   res.locals.error_msg = req.flash('error_msg')
  //   res.locals.error = req.flash('errors')
  //   next()
  // })
  app.use(router)

  app.use(logger('dev'))
  app.use(notFound)
  app.use(serverError)

  return app
}
module.exports = createApp
