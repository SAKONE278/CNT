const Room = require('../../models/Room');
const Message = require('../../models/Message');
const User = require('../../models/User');
const config = require('../../../config');
const getFile = require('../../utils/getFile');
const Socket = require('../../systems/Socket');

module.exports = async (req, res) => {
  let room;

  if (!req.fields.room) {
    return res.status(400).json({ status: 'error', user: 'room id required', message: 'room id required' });
  }

  room = await Room.findById(req.fields.room);

  let message;

  message = new Message({
    content: req.fields.content,
    author: req.user.id,
    room: room._id,
    members: room.members,
    access: room.access,
    files: req.fields.files,
    pictures: req.fields.pictures,
    type: 'message',
  });
  await message.save();

  room.lastUpdate = Date.now();
  room.lastMessage = message;
  await room.save();

  message = await Message.findById(message._id).populate('author').populate('pictures').lean();

  for (let j = 0; j < message.pictures.length; j++) {
    const file = { ...message.pictures[j] }.file;
    if (file && typeof file === 'string') {
      try {
        message.pictures[j].file = await getFile({
          shield: file,
          userId: req.user.id,
        });
      } catch (e) {}
    }
  }

  const io = Socket.get();

  for (let member of message.members) {
    io.to(member.toString()).emit('message', { message, room });
  }

  res.status(200).json({ status: 'ok', message, room });
};
