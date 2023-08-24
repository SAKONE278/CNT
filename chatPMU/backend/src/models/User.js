const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  roles: [
    {
      type: String,
    },
  ],
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'offline',
  },
  lastOnline: {
    type: Date,
    default: null,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
