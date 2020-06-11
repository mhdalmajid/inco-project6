const { isEmpty, isEmail, equals } = require('validator')
const { hash, compare } = require('bcryptjs')
const UserModel = require('../models/user')
const { newUserValidate, modifyUserValidate } = require('../helpers/validator')

const modifyUser = async (req, res) => res.render('modifyUser', { user: req.user })

const modifyUserPost = async (req, res) => {
  let { name, email, password, confirmPassword } = req.body
  let errors = []
  let updateFields = { name, email }
  if (isEmpty(name)) errors.push({ msg: 'name must not be empty' })
  if (!isEmail(email)) errors.push({ msg: 'email address incorrect' })
  if (!isEmpty(password) && !equals(password, confirmPassword))
    errors.push({ msg: ' password must match confirm password' })

  if (errors.length > 0)
    return res.render('modifyUser', {
      errors,
      name,
      email,
      password,
      confirmPassword,
    })
  if (!isEmpty(password)) {
    password = await hash(password, 12)
    updateFields = { name, email, password }
  }

  const modifiedUser = await UserModel.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updateFields },
    { new: true }
  )

  res.render('modifyUser', { success_msg: 'User Updated', user: req.body })
}

module.exports = { modifyUser, modifyUserPost }
