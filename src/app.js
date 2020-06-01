const express = require('express')
const session = require('express-session')
const logger = require('morgan')
const createError = require('http-errors')
const errorhandler = require('errorhandler')
const { sessConfig, appConfig } = require('./helpers/config')

const router = require('./routes/routes')

const app = express()

app.set('port', appConfig.port)
app.set('env')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(session(sessConfig))

app.use(router)

app.use(logger('dev'))
app.use((req, res, next) => next(createError(404)))
app.use(
  errorhandler({
    log: (err, str, req) => {
      let _title = `Error in ${req.method} ${req.url}`
      console.error(`${_title}\n${err}`)
    },
  })
)
module.exports = app
