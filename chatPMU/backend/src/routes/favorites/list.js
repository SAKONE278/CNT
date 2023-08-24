const Room = require('../../models/Room');
const getFile = require('../../utils/getFile');

module.exports = async (req, res) => {
  let rooms = await Room.find({ members: { $in: [req.user.id] }, favorites: { $in: [req.user.id] } })
    .sort({ lastUpdate: -1 })
    .limit(50)
    .populate('members')
    .populate('lastAuthor')
    .populate('lastMessage')
    .lean();

  for (let i = 0; i < rooms.length; i++) {
    for (let j = 0; j < rooms[i].members.length; j++) {
      const picture = { ...rooms[i].members[j] }.picture;
      if (picture && typeof picture === 'string') {
        try {
          rooms[i].members[j].picture = await getFile({
            shield: picture,
            userId: req.user.id,
          });
        } catch (e) {}
      }
    }
  }

  for (let j = 0; j < rooms.length; j++) {
    const picture = { ...rooms[j] }.picture;
    if (picture && typeof picture === 'string') {
      try {
        rooms[j].picture = await getFile({
          shield: picture,
          userId: req.user.id,
        });
      } catch (e) {}
    }
  }

  res.status(200).json({ status: 'ok', list: rooms });
};
