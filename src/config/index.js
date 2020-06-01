const {
  APP_ORIGIN,
  NODE_ENV,
  IS_PROD,
  APP_PORT,
  APP_HOSTNAME,
  APP_PROTOCOL,
  APP_SECRET,
} = require('./app')

const { SESSION_OPTIONS } = require('./session')
const { MONGO_URI, MONGO_OPTIONS } = require('./db')
const { REDIS_OPTIONS } = require('./cache')

module.exports = {
  APP_ORIGIN,
  NODE_ENV,
  IS_PROD,
  APP_PORT,
  APP_HOSTNAME,
  APP_PROTOCOL,
  APP_SECRET,
  SESSION_OPTIONS,
  MONGO_URI,
  MONGO_OPTIONS,
  REDIS_OPTIONS,
}
