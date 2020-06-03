const { connect, connection } = require('mongoose')
const session = require('express-session')
const { createClient } = require('redis')
const connectRedis = require('connect-redis')
const createApp = require('./src/app')
const { REDIS_OPTIONS, MONGO_URI, MONGO_OPTIONS, APP_PORT } = require('./src/config')

connect('mongodb://localhost/project6', MONGO_OPTIONS)
  .then(() => {
    /** *****************
     * Redis Initializer
     *    for catches
     * ******************
     */
    const RedisStore = connectRedis(session)
    const redisClient = createClient()
    const store = new RedisStore({ ...REDIS_OPTIONS, client: redisClient })

    /** *****************
     * EXPRESS Initializer
     *  will create express app
     * ******************
     */
    const app = createApp(store)

    app.listen(APP_PORT, () => console.log(`🚀🚀 At 👉 http://localhost:${APP_PORT} `))
  })
  .catch((err) => console.error(err))
