const Room = require('../../models/Room');
const Message = require('../../models/Message');
const getFile = require('../../utils/getFile');

module.exports = async (req, res) => {
  let room;

  if (!req.fields.room) {
    return res.status(400).json({ status: 'error', user: 'room id required', message: 'room id required' });
  }

  room = await Room.findById(req.fields.room).populate('lastAuthor').populate('lastMessage').populate('members').lean();

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

  room.picture = await getFile({
    shield: room.picture,
    userId: req.user.id,
  });

  res.status(200).json({ status: 'ok', room });
};
