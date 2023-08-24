const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MessageSchema = new Schema({
  members: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  deleted: {
    type: Boolean,
    default: false,
  },
  delivered: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  seen: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  author: {
    type: ObjectId,
    ref: 'User',
  },
  authorObject: {
    type: Object,
  },
  content: String,
  pictures: [
    {
      thumbnail: Number,
      file: String,
    },
  ],
  files: [
    {
      name: String,
      file: String,
    },
  ],
  room: {
    type: ObjectId,
    ref: 'Room',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    default: 'system',
  },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
