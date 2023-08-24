require('dotenv').config();
const isEmpty = require('./src/utils/isEmpty');
const version = require('./version.json');

module.exports = {
  env: process.env.ENV || 'local',
  templatesPath: `${__dirname}/src/templates`,
  appTitle: process.env.APP_TITLE || 'Chat',
  appVersion: version.version,
  appBuild: version.build,
  verbose: process.env.VERBOSE === 'true',
  registerEnabled: (process.env.REGISTER_ENABLED || '').toString() === 'true',
  workers: process.env.WORKERS || 2,
  port: process.env.PORT || 80,
  rootUser: {
    username: process.env.ROOT_USER_USERNAME,
    email: process.env.ROOT_USER_EMAIL,
    password: process.env.ROOT_USER_PASSWORD,
    firstName: process.env.ROOT_USER_FIRST_NAME,
    lastName: process.env.ROOT_USER_LAST_NAME,
  },
  mongo: {
    uri: process.env.MONGO_URI,
    srv: (process.env.MONGO_SRV || '').toString() === 'true',
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    authenticationDatabase: process.env.MONGO_AUTHENTICATION_DATABASE,
    hostname: process.env.MONGO_HOSTNAME,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DATABASE_NAME || 'clover',
  },
  secret: process.env.AUTH_SECRET || 'enterprise-messaging-platform',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  thumbnail: [
    {
      key: 'little',
      size: 128,
      type: 'crop', // Types are crop, width, height
    },
    {
      key: 'medium',
      size: 256,
      type: 'crop', // Types are crop, width, height
    },
    {
      key: 'big',
      size: 512,
      type: 'crop', // Types are crop, width, height
    },
    {
      key: 'width',
      size: 512,
      type: 'width', // Types are crop, width, height
    },
    {
      key: 'height',
      size: 1024,
      type: 'height', // Types are crop, width, height
    },
  ],
  mailerEnabled: process.env.MAILER_ENABLED === 'true',
  nodemailer: {
    from: process.env.MAILER_FROM,
  },
  nodemailerTransport: {
    service: isEmpty(process.env.MAILER_SERVICE) ? undefined : process.env.MAILER_SERVICE,
    host: isEmpty(process.env.MAILER_HOST) ? undefined : process.env.MAILER_HOST,
    port: isEmpty(process.env.MAILER_PORT) ? undefined : parseInt(process.env.MAILER_HOST),
    secure: isEmpty(process.env.MAILER_SECURE) ? undefined : process.env.MAILER_SECURE === 'true',
    auth: {
      user: process.env.MAILER_USERNAME,
      pass: process.env.MAILER_PASSWORD,
    },
  },
  nodemailerFooter: process.env.MAILER_FOOTER,
  supportEmailAddress: process.env.SUPPORT_EMAIL_ADDRESS || 'support@example.com',
};
