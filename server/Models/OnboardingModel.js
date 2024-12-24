const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
  },
  isboarded: {
    type: Boolean,
    isOnboarded: false,
  },
  tagLine: {
    type: String,
    unique: true,
    required: [true, 'Please enter a tagline'],
  },
  experience: {
    type: Number,
    required: [true, 'Please specify an experience level'],
  },
  expertise: {
    type: [String],
    validate: {
      validator: function (array) {
        return array.length >= 4;
      },
      message: 'At least 4 skills should be selected',
    },
    required: [true, 'Please select at least 4 skills'],
  },
  location: {
    type: String,
    required: [true, 'Please select a location'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  Bio: {
    type: String,
    required: [true, 'Please write a brief bio about yourself'],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;