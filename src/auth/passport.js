const LocalStrategy = require('passport-local').Strategy
let User = require('../models/user')

// Since we are using the passport.authenticate() method, we should be redirected no matter what
// app.post(
//   '/login',
//   passport.authenticate('local', {
//     failureRedirect: '/login-failure',
//     successRedirect: 'login-success',
//   }),
//   (err, req, res, next) => {
//     if (err) next(err)
//   }
// )

const findUserByEmailAndPassword = async (email, password, done) => {
  try {
    const user = await User.findOne({ email })

    if (!user) return done(null, false, { message: 'email is not registered' })

    const isMatch = await user.matchesPassword(password)

    if (isMatch) return done(null, user)

    return done(null, false, { message: 'Password incorrect' })
  } catch (error) {
    return done(error, false)
  }
}

const passportConfig = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, findUserByEmailAndPassword))

  passport.serializeUser((user, done) => done(null, user.id))

  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })
}

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next()

  req.flash('error_msg', 'Please log in to view that resource')
  res.redirect('/login')
}
const forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) return next()

  res.redirect('/')
}

module.exports = { passportConfig, ensureAuthenticated, forwardAuthenticated }
