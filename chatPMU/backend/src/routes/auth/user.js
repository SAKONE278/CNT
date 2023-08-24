const User = require('../../models/User');
const getFile = require('../../utils/getFile');

module.exports = async (req, res) => {
  let user = await User.findById(req.user.id).lean();

  if (user.picture) {
    user.picture = await getFile({
      shield: user.picture,
      userId: req.user.id,
    });
  }

  res.status(200).json({ status: 'success', user });
};
