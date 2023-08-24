const { findUsers } = require('../../dao/users');
const getFile = require('../../utils/getFile');
module.exports = async (req, res) => {
  const { limit, text, sortField, sortOrder } = req.fields;

  let query = {};

  if (text) {
    query = {
      ...query,
      $or: [
        { fullName: { $regex: `.*${text}.*`, $options: 'i' } },
        { username: { $regex: `.*${text}.*`, $options: 'i' } },
        { email: text },
      ],
    };
  }

  let sort = { id: -1 };
  if (sortField) {
    sort = {};
    sort[sortField] = parseInt(sortOrder);
  }

  let users;

  try {
    users = await findUsers(query, sort, limit || 500);

    for (let j = 0; j < users.length; j++) {
      const picture = { ...users[j] }.picture;
      if (picture && typeof picture === 'string') {
        try {
          users[j].picture = await getFile({
            shield: picture,
            userId: req.user.id,
          });
        } catch (e) {}
      }
    }

    return res.status(200).json({ count: users.length, users });
  } catch (e) {
    return res.status(500).json({ status: 'error', message: 'database read error' });
  }
};
