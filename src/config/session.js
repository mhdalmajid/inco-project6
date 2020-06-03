const { IS_PROD } = require('./app')
const { THIRTY_MINUTES } = require('../helpers/time')

const {
  SESSION_SECRET = 'please keep this secret, mate',
  SESSION_NAME = 'sid',
  SESSION_IDLE_TIMEOUT = THIRTY_MINUTES,
} = process.env

const SESSION_OPTIONS = {
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: IS_PROD,
    sameSite: true,
  },
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  rolling: true,
  resave: false,
  saveUninitialized: false,
}

module.exports = { SESSION_OPTIONS }
