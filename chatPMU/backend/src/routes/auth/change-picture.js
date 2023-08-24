const { findUserById } = require('../../dao/users');
const User = require('../../models/User');
const getFile = require('../../utils/getFile');

module.exports = async (req, res) => {
  const { id } = req.fields;

  let user, result;

  try {
    user = await findUserById(req.user.id);
  } catch (e) {
    return res.status(500).json({ status: 'error', message: 'database read error' });
  }

  if (!user) {
    return res.status(404).json({ status: 'error', message: 'user not found' });
  }

  user.picture = id;

  try {
    await user.save();
  } catch (e) {
    return res.status(500).json({ status: 'error', message: 'database write error' });
  }

  user = await User.findById(req.user.id).lean();

  user.picture = await getFile({
    shield: user.picture,
    userId: req.user.id,
  });

  res.status(200).json({ status: 'success', user });
};
