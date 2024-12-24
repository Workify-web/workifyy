const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { type } = require('os');

const userSchema = new mongoose.Schema({
  // googleId: {
  //   type: String,
  //   unique: true,
  // },
  // accessToken: {
  //   type: String,
  // },
  // refreshToken: {
  //   type: String,
  // },

  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  firstname: {
    type: String,
    required: [true, 'Please tell us your FirstName'],
  },

  lastname: {
    type: String,
    required: [true, 'Please tell us your LastName'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },

  role: {
    type: String,
    enum: ['client', 'professional', 'admin'],
    default: 'professional',
  },
  terms: {
    type: Boolean,
    required: [true, 'Please you must agree to the terms and condition'],
  },

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Middlewares
// userSchema.pre('save', async function (next) {
//   if (this.isNew) {
//     await SendVerificationEmails(this.email, this.otp);
//   }
//   next();
// });
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Encrpyt the password, cost = 12 **Can be edited**
  this.password = await bcrypt.hash(this.password, 12);

  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre(/^find/, function(next){
  this.find({active:{$ne:false}})
  next()
})

const User = mongoose.model('User', userSchema);
module.exports = User;
