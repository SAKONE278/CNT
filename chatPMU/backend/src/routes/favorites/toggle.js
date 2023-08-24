const Room = require('../../models/Room');

module.exports = async (req, res) => {
  const roomId = req.fields.roomId;

  const room = await Room.findById(roomId).lean();

  if (!room) {
    return res.status(404).json({
      message: 'not-found',
    });
  }

  if (!room.favorites) {
    room.favorites = [];
  }

  if (room.favorites.includes(req.user.id.toString())) {
    await Room.findByIdAndUpdate(roomId, {
      $pullAll: {
        favorites: [req.user.id],
      },
    });
  } else {
    await Room.findByIdAndUpdate(roomId, {
      $addToSet: {
        favorites: [req.user.id],
      },
    });
  }

  res.status(200).json({
    message: 'ok',
  });
};
