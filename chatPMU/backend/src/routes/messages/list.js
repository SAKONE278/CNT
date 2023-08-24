const Message = require('../../models/Message');
const getFile = require('../../utils/getFile');

module.exports = async (req, res) => {
  if (!req.fields.room) {
    return res.status(400).json({ status: 'error', user: 'room id required', message: 'room id required' });
  }

  const messages = await Message.find({ room: req.fields.room })
    .sort({ lastUpdate: -1 })
    .limit(50)
    .populate('pictures')
    .populate('author')
    .lean();

  for (let i = 0; i < messages.length; i++) {
    for (let j = 0; j < messages[i].pictures.length; j++) {
      const file = { ...messages[i].pictures[j] }.file;
      if (file && typeof file === 'string') {
        try {
          messages[i].pictures[j].file = await getFile({
            shield: file,
            userId: req.user.id,
          });
        } catch (e) {}
      }
    }
  }

  res.status(200).json({ status: 'ok', messages });
};
