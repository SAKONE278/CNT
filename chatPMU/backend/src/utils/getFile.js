const { deleteSessions } = require('../dao/sessions');
const Session = require('../models/Session');
const Shield = require('../models/Shield');
const moment = require('moment');
const randomstring = require('randomstring');
const config = require('../../config');

const getFile = async ({ shield, userId }) => {
  try {
    await deleteSessions();
  } catch (e) {
    return null;
  }

  let session;

  try {
    session = await Session({
      expires: moment().add(3600, 'seconds').toDate(),
      shield,
      user: userId,
    }).save();
  } catch (e) {
    return null;
  }

  const random = randomstring.generate({ length: 64, charset: 'alphanumeric', capitalization: 'lowercase' });
  const signature = session.id + random;
  session.signature = signature;

  try {
    await session.save();
  } catch (e) {
    return null;
  }

  let shieldObject;

  try {
    shieldObject = await Shield.findOne({ shield });
  } catch {
    shieldObject = {};
  }

  if (!shieldObject) {
    shieldObject = {};
  }

  return {
    signature,
    url: `${config.baseUrl}/api/files/${shield}?signature=${signature}`,
    littleThumbnailUrl: `${config.baseUrl}/api/files/${shield}?signature=${signature}&thumbnail=little`,
    mediumThumbnailUrl: `${config.baseUrl}/api/files/${shield}?signature=${signature}&thumbnail=medium`,
    largeThumbnailUrl: `${config.baseUrl}/api/files/${shield}?signature=${signature}&thumbnail=big`,
    lightboxImageUrl: `${config.baseUrl}/api/files/${shield}?signature=${signature}&thumbnail=height`,
    type: shieldObject.type,
    size: shieldObject.size,
    originalName: shieldObject.originalName,
  };
};

module.exports = getFile;
