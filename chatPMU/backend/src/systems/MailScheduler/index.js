const config = require('../../../config');
const fs = require('fs');
const schedule = require('node-schedule');
const handlebars = require('handlebars');
const { Email, Lock } = require('../../models');
const readHTMLFile = require('../../utils/readHTMLFile');
const sendMail = require('../../utils/sendMail');
const { v4: uuidv4 } = require('uuid');

const init = async () => {
  const owner = uuidv4();

  process.stdin.resume();

  const exitHandler = async () => {
    if (lock && lock.owner === owner) {
      lock.status = 'available';
      lock.owner = null;
      lock.uuid = null;
      await lock.save();
    }
  };

  process.on('exit', exitHandler.bind(null, { cleanup: true }));
  process.on('SIGINT', exitHandler.bind(null, { exit: true }));
  process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
  process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
  process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

  let lock;

  lock = await Lock.findOne({ type: 'email' });

  if (!lock) {
    lock = new Lock({
      type: 'email',
      status: 'available',
    });
    await lock.save();
  }

  let lastLockOwner;

  schedule.scheduleJob('*/5 * * * * *', async () => {
    const uuid = owner + '-' + Date.now();

    await Lock.updateOne({ type: 'email', status: 'available' }, { $set: { status: 'locked', owner, uuid } });
    lock = await Lock.findOne({ type: 'email' });

    if (lock.uuid !== uuid) {
      if (lock.owner !== lastLockOwner) {
        console.log(`${'mailer'.cyan}: ${`lock acquired by someone else`.yellow} - ${lock.owner}`);
      }
      lastLockOwner = lock.owner;
      return;
    } else {
      if (lock.owner !== lastLockOwner) {
        console.log(`${'mailer'.cyan}: ${`lock acquired by me`.green} - ${lock.owner}`);
      }
      lastLockOwner = lock.owner;
    }

    const emails = await Email.find({ sent: false, env: config.env });

    for (let email of emails) {
      try {
        if (!email.template) {
          await Email.deleteOne({ _id: email._id });
        } else {
          let language = email.language;

          let path = `${config.templatesPath}/${language}/${email.template}.html`;

          if (!fs.existsSync(path)) {
            path = `${config.templatesPath}/en/${email.template}.html`;
          }

          const file = await readHTMLFile(path);
          const template = handlebars.compile(file);
          const html = template({ ...(email.replacements || {}), appTitle: config.appTitle });

          await sendMail({
            from: email.from,
            to: email.to,
            subject: email.subject,
            html,
          });
          const entry = await Email.findById(email._id);
          entry.sent = true;
          entry.dateSent = Date.now();
          await entry.save();
        }
      } catch (e) {
        console.log(e);
      }
    }

    lock.status = 'available';
    lock.owner = null;
    lock.uuid = null;
    await lock.save();
  });

  console.log('mail scheduler system online'.green);
};

module.exports = { init };
