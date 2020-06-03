const { Schema, model } = require('mongoose')
const { hash, compare } = require('bcryptjs')
const { BCRYPT_WORK_FACTOR } = require('../config')

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true, lowercase: true },
    password: String,
    verifiedAt: Date,
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function () {
  if (this.isModified('password')) this.password = await hash(this.password, BCRYPT_WORK_FACTOR)
})

userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password)
}

const User = model('User', userSchema)

module.exports = User
