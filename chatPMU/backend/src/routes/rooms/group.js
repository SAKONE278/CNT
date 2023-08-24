const Room = require('../../models/Room');
const Message = require('../../models/Message');
const getFile = require('../../utils/getFile');

module.exports = async (req, res) => {
  let room;

  room = new Room({
    members: [req.user.id, ...req.fields.users],
    access: [req.user.id, ...req.fields.users],
    picture: req.fields.picture,
    title: req.fields.title,
    isGroup: true,
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

  room = await Room.findById(room._id).populate('lastAuthor').populate('lastMessage').populate('members');

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
