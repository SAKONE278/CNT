const mongoose = require('mongoose');
const config = require('../../config');
const { Log, Shield, User } = require('../models');
const moment = require('moment');
const { mongo } = config;
const { ObjectId } = mongoose.Types;

const getOverall = () => {
  return mongoose.connection.db.stats();
};

const getReplica = async () => {
  const uri =
    mongo.uri ||
    `mongodb${mongo.srv ? '+srv' : ''}://${mongo.username}:${encodeURIComponent(mongo.password)}@${mongo.hostname}:${
      mongo.port
    }/admin?authSource=admin`;

  let conn, result;
  try {
    conn = await mongoose.createConnection(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      ssl: false,
    });
    result = await conn.db.command({ replSetGetStatus: 1 });
    conn.close();
  } catch (e) {
    console.log(e);
    result = null;
  }
  return result;
};

const aggregateType = async ({ type, user }) => {
  const aggregate = await Shield.aggregate([
    {
      $match: user
        ? { owner: ObjectId(user), type: { $regex: `.*${type}.*`, $options: 'i' } }
        : { type: { $regex: `.*${type}.*`, $options: 'i' } },
    },
    {
      $project: { _id: 1, type: 'type' },
    },
    {
      $group: { _id: '$type', count: { $sum: 1 } },
    },
  ]);

  return aggregate && aggregate[0] ? aggregate[0].count : 0;
};

const getCounts = async ({ user }) => {
  let counts = {};

  counts.shields = await Shield.countDocuments(user ? { owner: ObjectId(user) } : {});
  counts.images = await aggregateType(user ? { type: 'image', user } : { type: 'image' });
  counts.videos = await aggregateType(user ? { type: 'video', user } : { type: 'video' });
  counts.pdf = await aggregateType(user ? { type: 'pdf', user } : { type: 'pdf' });
  counts.others = counts.shields - counts.images - counts.videos - counts.pdf;

  if (!user) {
    counts.users = await User.countDocuments();
  }

  return counts;
};

const countKeyTraffic = async (key, date, user) => {
  let aggregate = await Log.aggregate([
    {
      $match: user
        ? {
            key,
            timestamp: {
              $lte: date.endOf('day').toDate(),
              $gt: date.startOf('day').toDate(),
            },
            user: ObjectId(user),
          }
        : {
            key,
            timestamp: {
              $lte: date.endOf('day').toDate(),
              $gt: date.startOf('day').toDate(),
            },
          },
    },
    {
      $project: { _id: 1, type: 'type', size: 1 },
    },
    {
      $group: { _id: '$type', count: { $sum: '$size' } },
    },
  ]);
  return aggregate && aggregate[0] ? aggregate[0].count : 0;
};

const getTraffic = async ({ days, user }) => {
  let traffic = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = moment().subtract(i, 'days');
    const download = await countKeyTraffic('read', date, user);
    const upload = await countKeyTraffic('upload', date, user);
    const write = await countKeyTraffic('write', date, user);
    const remove = await countKeyTraffic('remove', date, user);
    traffic.push({ date: date.toISOString(), download, upload, write, remove });
  }

  return traffic;
};

const aggregateCurrentMonth = async (key, user) => {
  let aggregate = await Log.aggregate([
    {
      $match: user
        ? {
            key,
            timestamp: {
              $gt: moment().startOf('month').toDate(),
            },
            user: ObjectId(user),
          }
        : {
            key,
            timestamp: {
              $gt: moment().startOf('month').toDate(),
            },
          },
    },
    {
      $project: { _id: 1, type: 'type', size: 1 },
    },
    {
      $group: { _id: '$type', count: { $sum: '$size' } },
    },
  ]);
  return aggregate && aggregate[0] ? aggregate[0].count : 0;
};

const aggregateWeek = async (key, user) => {
  let aggregate = await Log.aggregate([
    {
      $match: user
        ? {
            key,
            timestamp: {
              $gt: moment().subtract(7, 'days').toDate(),
            },
            user: ObjectId(user),
          }
        : {
            key,
            timestamp: {
              $gt: moment().subtract(7, 'days').toDate(),
            },
          },
    },
    {
      $project: { _id: 1, type: 'type', size: 1 },
    },
    {
      $group: { _id: '$type', count: { $sum: '$size' } },
    },
  ]);
  return aggregate && aggregate[0] ? aggregate[0].count : 0;
};

const getTransfer = async (user) => {
  let transfer = {};

  transfer.download = await aggregateCurrentMonth('read', user);
  transfer.upload = await aggregateCurrentMonth('upload', user);

  return transfer;
};

const dataSizeVariation = async (user) => {
  let dataSizeVariation = {};
  let dataSize = 0;

  if (user) {
    const shields = await Shield.find({ owner: ObjectId(user) }, { _id: 0, size: 1, thumbnailSize: 1 }).lean();
    for (let shield of shields) {
      dataSize += shield.size;
      dataSize += shield.thumbnailSize || 0;
    }
  } else {
    const dbStats = await getOverall();
    dataSize = dbStats.dataSize;
  }

  const writesMonth = await aggregateCurrentMonth('write', user);
  const removesMonth = await aggregateCurrentMonth('remove', user);
  dataSizeVariation.month = writesMonth - removesMonth;

  const writesWeek = await aggregateWeek('write', user);
  const removesWeek = await aggregateWeek('remove', user);
  dataSizeVariation.week = writesWeek - removesWeek;

  return { dataSize, variation: dataSizeVariation };
};

const getFiles = async (user) => {
  let files = {};

  files.total = await Shield.countDocuments(user ? { owner: ObjectId(user) } : {});
  files.additions = await Log.countDocuments(
    user
      ? {
          key: 'upload',
          timestamp: {
            $gt: moment().startOf('month').toDate(),
          },
          user: ObjectId(user),
        }
      : {
          key: 'upload',
          timestamp: {
            $gt: moment().startOf('month').toDate(),
          },
        },
  );
  files.removals = await Log.countDocuments(
    user
      ? {
          key: 'delete',
          timestamp: {
            $gt: moment().startOf('month').toDate(),
          },
          user: ObjectId(user),
        }
      : {
          key: 'delete',
          timestamp: {
            $gt: moment().startOf('month').toDate(),
          },
        },
  );

  return files;
};

module.exports = { getOverall, getReplica, getCounts, getTraffic, getTransfer, dataSizeVariation, getFiles };
