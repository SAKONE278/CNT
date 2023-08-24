const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const config = require('../../config');

const EmailSchema = new Schema({
  from: String,
  to: String,
  subject: String,
  template: String,
  replacements: Object,
  language: {
    type: String,
    default: 'en',
  },
  sent: {
    type: Boolean,
    default: false,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  dateSent: Date,
  env: {
    type: String,
    default: config.env,
  },
});

const Email = mongoose.model('Email', EmailSchema);

module.exports = Email;
