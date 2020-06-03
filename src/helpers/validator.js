const { isEmpty, isEmail, equals } = require('validator')
const UserModel = require('../models/user')

const newUserValidate = async ({ name, email, password, confirmPassword }) => {
  const error = []
  const isEmailexist = await UserModel.findOne({ email })

  if (isEmailexist) error.push({ msg: 'email already exists' })
  if (isEmpty(name)) error.push({ msg: 'name must not be empty' })
  if (!isEmail(email)) error.push({ msg: 'email address incorrect' })
  if (isEmpty(password)) error.push({ msg: 'password must not be empty' })
  if (isEmpty(password) || !equals(password, confirmPassword))
    error.push({ msg: ' password must match confirm password' })

  return error
}

const loginUserValidate = async ({ email, password }) => {
  const error = []

  if (!isEmail(email)) error.push({ msg: 'email address incorrect' })
  if (isEmpty(password)) error.push({ msg: 'password must not be empty' })

  const User = await UserModel.findOne({ email })

  if (User) {
    if (!(await User.matchesPassword(password))) error.push({ msg: 'invalide Password' })
  } else error.push({ msg: 'invalide Email or Password' })

  return error
}

module.exports = { newUserValidate, loginUserValidate }
