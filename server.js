const { connect, connection } = require('mongoose')
const session = require('express-session')
const { createClient } = require('redis')
const connectRedis = require('connect-redis')
const createApp = require('./src/app')
const { REDIS_OPTIONS, MONGO_URI, MONGO_OPTIONS, APP_PORT } = require('./src/config')

connect(MONGO_URI, MONGO_OPTIONS)
  .then(() => {
    /** *****************
     * Redis Initializer
     *    for catches
     * ******************
     */
    const RedisStore = connectRedis(session)
    const redisClient = createClient()

    redisClient.on('connect', () => console.log('Connected to Redis'))
    redisClient.on('error', (err) => console.log(`Redis error: ${err}`))

    const store = new RedisStore({ ...REDIS_OPTIONS, client: redisClient })

    /** *****************
     * EXPRESS Initializer
     *  will create express app
     * ******************
     */
    const app = createApp(store)

    app.listen(APP_PORT, () =>
      console.log(`Server running 🚀🚀 At 👉 http://localhost:${APP_PORT} `)
    )
  })
  .catch((err) => console.error(err))
