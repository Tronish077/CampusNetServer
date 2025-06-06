const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    trim: true,
  },
  profilePhoto: String,

  bio: {
    type: String,
    maxLength: 300,
  },
  campus: {
    type: String,
  },
  contactNumber: {
    type: String,
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  preferences: {
    interests: [String],
    darkMode: {
      type: Boolean,
      default: false,
    },
  },

  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: Date,
});

module.exports = mongoose.model('User', UserSchema, 'Users');
