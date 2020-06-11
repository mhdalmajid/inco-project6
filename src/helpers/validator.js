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
const modifyUserValidate = async ({ name, email, password, confirmPassword }) => {
  const error = []

  if (isEmpty(name)) error.push({ msg: 'name must not be empty' })
  if (!isEmail(email)) error.push({ msg: 'email address incorrect' })
  if (isEmpty(password)) error.push({ msg: 'password must not be empty' })
  if (isEmpty(password) || !equals(password, confirmPassword))
    error.push({ msg: ' password must match confirm password' })

  return error
}
const loginValidate = async ({ email, password }) => {
  const errors = []

  if (!isEmail(email)) errors.push({ msg: 'email address should be a valid email' })
  if (isEmpty(password)) errors.push({ msg: 'password must not be empty' })

  return errors
}

module.exports = { newUserValidate, loginValidate, modifyUserValidate }
