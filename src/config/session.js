const IN_PROD = require('./app')
const { THIRTY_MINUTES, SIX_HOURS } = require('../helpers/time')

const {
  SESSION_SECRET = 'please keep this secret, mate',
  SESSION_NAME = 'sid',
  SESSION_IDLE_TIMEOUT = THIRTY_MINUTES,
  _SESSION_ABSOLUTE_TIMEOUT,
} = process.env

const SESSION_ABSOLUTE_TIMEOUT = +(_SESSION_ABSOLUTE_TIMEOUT || SIX_HOURS)

const SESSION_OPTIONS = {
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: IN_PROD,
    sameSite: true,
  },
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  rolling: true,
  resave: false,
  saveUninitialized: false,
}

module.exports = { SESSION_OPTIONS }
