const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MeetingSchema = new Schema({
  title: {
    type: String,
    default: 'Meeting',
  },
  token: {
    type: String,
    required: true,
  },
  members: [
    {
      // users who are currently in the meeting - removed when exit from meeting
      type: Object,
    },
  ],
  peers: [
    {
      // peers who are currently in the meeting - removed when exit from meeting
      type: String,
    },
  ],
  producers: [
    {
      type: Object,
    },
  ],
  consumers: [
    {
      type: String,
    },
  ],
  attendees: [
    {
      // users who have joined the meeting - can only add
      type: Object,
    },
  ],
  presenters: [
    {
      // users who can manage others - can be added or removed
      type: Object,
    },
  ],
  access: [
    {
      // users who can join the meeting if set to private
      type: Object,
    },
  ],
  private: {
    type: Boolean,
    default: false,
  },
  guests: [
    {
      // users who have been invited to the meeting - can only add
      type: Object,
    },
  ],
  room: {
    // associated messaging room - can change during the meeting
    type: ObjectId,
    ref: 'Room',
  },
  sourceRoom: {
    // if started as call, this is the source room - at the beginning of the call, this is equal to room
    type: ObjectId,
    ref: 'Room',
  },
  lastJoin: Date,
  owner: {
    type: Object,
  },
  isCall: {
    type: Boolean,
    default: false,
  },
  requestVideo: {
    type: Boolean,
    default: false,
  },
  caller: {
    type: ObjectId,
    ref: 'User',
  },
  callee: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  accepted: [
    {
      // users who accepted
      type: Object,
    },
  ],
  declined: [
    {
      // users who declined
      type: Object,
    },
  ],
});

const Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = Meeting;
