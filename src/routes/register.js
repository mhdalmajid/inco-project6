const UserModel = require('../models/user')
const { newUserValidate } = require('../helpers/validator')

const register = async (req, res) => res.render('register')

const registerPost = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  const errorValidation = await newUserValidate(req.body)

  if (errorValidation.length > 0)
    return res.render('register', {
      errors: errorValidation,
      name,
      email,
      password,
      confirmPassword,
    })

  const newUser = new UserModel({ name, email, password })

  const save = await newUser.save()

  req.flash('success_msg', 'You are now registered and can log in')
  req.flash('email', save.email)
  res.redirect('/login')
}

module.exports = { register, registerPost }
