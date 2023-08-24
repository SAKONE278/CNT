const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LockSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: false,
  },
  uuid: {
    type: String,
    required: false,
  },
});

const Lock = mongoose.model('Lock', LockSchema);

module.exports = Lock;
