const { Schema, model } = require('mongoose')
const { hash, compare } = require('bcryptjs')
const { BCRYPT_WORK_FACTOR } = require('../config')

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function () {
  if (this.isModified('password')) this.password = await hash(this.password, 12)
})

userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password)
}

const User = model('User', userSchema)
module.exports = User
