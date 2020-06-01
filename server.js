const mongoose = require('mongoose')
const session = require('express-session')
const Redis = require('redis')
const connectRedis = require('connect-redis')
const createApp = require('./src/app')
const { REDIS_OPTIONS, MONGO_URI, MONGO_OPTIONS, APP_PORT } = require('./src/config')

const createServer = async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS)
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))

  const RedisStore = connectRedis(session)

  const redisClient = Redis.createClient()

  const store = new RedisStore({ ...REDIS_OPTIONS, client: redisClient })

  const app = createApp(store)

  app.listen(APP_PORT, () => console.log(`🚀🚀 At 👉 http://localhost:${APP_PORT} `))
}

createServer().catch((err) => console.log(err))

const redisClient = Redis.createClient()
const redisStore = connectRedis(session)
