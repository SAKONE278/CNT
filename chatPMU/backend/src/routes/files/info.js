const getFile = require('../../utils/getFile');

module.exports = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'id required' });
  }

  const response = await getFile({
    shield: id,
    userId: req.user.id,
  });

  res.status(200).json(response);
};
