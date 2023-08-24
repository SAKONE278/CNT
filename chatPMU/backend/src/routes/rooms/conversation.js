const Room = require('../../models/Room');
const Message = require('../../models/Message');
const getFile = require('../../utils/getFile');

module.exports = async (req, res) => {
  let room;

  if (!req.fields.user) {
    return res.status(400).json({ status: 'error', user: 'user required', message: 'user required' });
  }

  room = await Room.findOne({
    members: { $all: [req.user.id, req.fields.user] },
    isGroup: false,
  })
    .populate('lastAuthor')
    .populate('lastMessage')
    .populate('members');

  if (!room) {
    room = new Room({
      members: [req.user.id, req.fields.user],
      access: [req.user.id, req.fields.user],
    });
    await room.save();

    const message = new Message({
      content: 'created',
      author: req.user.id,
      room: room._id,
      members: room.members,
      access: room.access,
      type: 'system',
    });
    await message.save();

    room.lastUpdate = Date.now();
    room.lastMessage = message;
    await room.save();
  }

  room = await Room.findById(room._id).populate('lastAuthor').populate('lastMessage').populate('members').lean();

  for (let j = 0; j < room.members.length; j++) {
    const picture = { ...room.members[j] }.picture;
    if (picture && typeof picture === 'string') {
      try {
        room.members[j].picture = await getFile({
          shield: picture,
          userId: req.user.id,
        });
      } catch (e) {}
    }
  }

  res.status(200).json({ status: 'ok', room });
};
