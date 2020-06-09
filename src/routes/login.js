const passport = require('passport')
const { loginValidate } = require('../helpers/validator')

const login = async (req, res) => {
  res.render('login', {
    errors: req.flash('errors'),
    success_msg: req.flash('success_msg'),
    error_msg: req.flash('error_msg'),
  })
}

const loginPost = async (req, res, next) => {
  const errorValidation = await loginValidate(req.body)

  if (errorValidation.length > 0) {
    req.flash('errors', errorValidation)
    return res.redirect('/login')
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)

    if (!user) {
      req.flash('error_msg', info.message)
      return res.redirect('/login')
    }

    req.logIn(user, (_err) => {
      if (_err) return next(_err)

      return res.redirect(`/`)
    })
  })(req, res, next)
}

module.exports = { login, loginPost }
