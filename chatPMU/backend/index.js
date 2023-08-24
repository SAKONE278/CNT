require('colors');
const { build, version } = require('./info');
const connectDB = require('./src/dao/connectDB');
const Versioning = require('./src/dao/versioning');
const Users = require('./src/dao/users');
const Sessions = require('./src/dao/sessions');
const config = require('./config');
const express = require('express');
const http = require('http');

const init = async () => {
  console.log('');
  console.log('♥♥♥'.green + ' ♥♥♥'.white + ' ♥♥♥'.red);
  console.log('♥♥♥'.green + ' ♥♥♥'.white + ' ♥♥♥'.red);
  console.log('♥♥♥'.green + ' ♥♥♥'.white + ' ♥♥♥'.red);
  console.log('');
  console.log('Honeyside'.yellow);
  console.log(`${config.appTitle} v${version}`.yellow);
  console.log('');

  const isConnected = await connectDB();

  if (!isConnected) return;

  const info = await Versioning.getCurrentVersion();

  if (!info || info.build < build) {
    await Versioning.updateCurrentVersion({ version, build });
  }

  await Users.updateRootUser();
  await Sessions.deleteSessions();

  const app = new express();

  const server = http.createServer(app);

  const Socket = require('./src/systems/Socket');
  await Socket.init(server);

  const cors = require('cors');
  const formidable = require('express-formidable');
  const passport = require('passport');
  const jwtStrategy = require('./src/strategies/jwt');
  const routes = require('./src/routes');
  const xss = require('xss').filterXSS;

  app.use(cors());

  app.use(formidable({ maxFileSize: Number.MAX_SAFE_INTEGER }));
  app.use((req, res, next) => {
    Object.keys(req.fields).map(
      (key) => typeof req.fields[key] === 'string' && (req.fields[key] = xss(req.fields[key])),
    );
    next();
  });
  app.use(passport.initialize({}));
  passport.use('jwt', jwtStrategy);
  app.use('/api', routes);

  app.use(express.static(`${__dirname}/../frontend/build`));
  app.use('/auth/*', express.static(`${__dirname}/../frontend/build`));
  app.use('/account', express.static(`${__dirname}/../frontend/build`));
  app.use('/room/*', express.static(`${__dirname}/../frontend/build`));

  await new Promise((resolve, reject) => {
    server.listen(config.port, (err) => {
      if (err) {
        console.log(err);
        reject();
      } else {
        console.log(`listening on port ${config.port}`.green);
        resolve();
      }
    });
  });

  const MailScheduler = require('./src/systems/MailScheduler');
  if (config.mailerEnabled) {
    await MailScheduler.init();
  } else {
    console.log('mail scheduler disabled'.yellow);
  }
};

init().then(() => {
  console.log('init complete'.green);
});
