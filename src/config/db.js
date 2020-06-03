const {
  MONGO_USERNAME = 'root',
  MONGO_PASSWORD = 'root',
  MONGO_HOST = 'cluster0-tdzoc.mongodb.net',
  MONGO_PORT = 27017,
  MONGO_DATABASE = 'project6',
} = process.env

// const MONGO_URI = `mongodb+srv://root:<password>@cluster0-tdzoc.mongodb.net/test?retryWrites=true&w=majority`
// const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`
// const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`
// 'mongodb://localhost/project6'
const MONGO_URI = `mongodb://localhost/${MONGO_DATABASE}`

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}

module.exports = { MONGO_URI, MONGO_OPTIONS }

// mongoose.connect('mongodb://localhost/project6', { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
//   if (err) {
//     console.log('Could not connect to mongodb on localhost. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!');
//   } else {
//     console.log("db connected!")
//   }
// });
