const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => /^\S+@\S+\.\S+$/.test(email),
      message: 'Invalid email format',
    },
  },
  otp: { type: String, required: true }, // Store hashed OTP
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // Automatically delete after 5 minutes
  },
});

const OTP = mongoose.model('OTP', otpSchema);
module.exports = OTP;
