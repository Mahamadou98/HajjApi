const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const userSchemas = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Le nom d'utilisateur est requis"],
    maxLength: [40, 'Le nom ne devrais pas depasser 40 caracteres'],
    minLength: [4, 'Le nom ne devrais pas etre au dessus de 4 caracteres'],
  },
  email: {
    type: String,
    required: [true, "l'address mail est requis"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Address mail doit etre une address valide'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin', 'teacher', 'superviseur'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minLength: [8, 'Le mot de passe doit etre superieur a 8 caracteres'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Veuillez confirmer votre mot de passe'],
    validate: {
      // this custom validator only work on create and save
      validator: function (el) {
        return el === this.password
      },
      message: 'erreur de confirmation de mot de passe',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
})

// Hashed user password
userSchemas.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next()

  //Hash the password with the salt of 12
  this.password = await bcrypt.hash(this.password, 12)

  //delete passwordConfirm field
  this.passwordConfirm = undefined
  next()
})

userSchemas.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next()

  this.passwordChangedAt = Date.now() - 1000
  next()
})

userSchemas.pre(/^find/, function (next) {
  // This points to the current query
  this.find({ active: { $ne: false } })
  next()
})

// create instance method
userSchemas.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchemas.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    )
    return JWTTimestamp < changedTimestamp
  }
  // return false if password isn't change
  return false
}

userSchemas.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000 // will expire in 10mn

  return resetToken
}

const User = mongoose.model('User', userSchemas)

module.exports = User
