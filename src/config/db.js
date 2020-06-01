const {
  MONGO_USERNAME = 'root',
  MONGO_PASSWORD = 'root',
  MONGO_HOST = 'cluster0-tdzoc.mongodb.net',
  MONGO_PORT = 27017,
  MONGO_DATABASE = 'project6',
} = process.env

// const MONGO_URI = `mongodb+srv://root:<password>@cluster0-tdzoc.mongodb.net/test?retryWrites=true&w=majority`
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

module.exports = { MONGO_URI, MONGO_OPTIONS }
