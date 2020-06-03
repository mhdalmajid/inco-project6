const { loginUserValidate } = require('../helpers/validator')

const login = async (req, res) => {
  res.render('login', { success_msg: req.flash('success_msg') })
}

const loginPost = async (req, res) => {
  const { email, password } = req.body
  const errors = await loginUserValidate({ email, password })

  if (errors.length > 0) return res.render('login', { errors })

  res.render('login')
}

module.exports = { login, loginPost }
