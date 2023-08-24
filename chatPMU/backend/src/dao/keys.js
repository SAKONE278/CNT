const { Key } = require('../models');

const findKeyByTitle = async (title) => {
  return Key.findOne({ title });
};

const findKeyById = async (id) => {
  return Key.findById(id);
};

const insertKey = async (data) => {
  return Key({
    title: data.title,
    user: data.user,
  }).save();
};

const findKeys = (query, sort, limit) => {
  return Key.aggregate()
    .project({
      _id: 0,
      id: '$_id',
      title: 1,
      user: 1,
      userObject: 1,
      date: 1,
      token: 1,
    })
    .match(query)
    .sort(sort)
    .limit(limit || 500)
    .exec();
};

module.exports = { findKeyByTitle, findKeyById, insertKey, findKeys };
