const mongoose = require('mongoose');
const config = require('../../config');
const { mongo } = config;

const connectDB = () =>
  new Promise(async (resolve) => {
    const uri =
      mongo.uri ||
      `mongodb${mongo.srv ? '+srv' : ''}://${mongo.username}:${encodeURIComponent(mongo.password)}@${mongo.hostname}:${
        mongo.port
      }/${mongo.database}?authSource=${mongo.authenticationDatabase}`;

    mongoose.set('strictQuery', false);

    // connect to mongo
    try {
      await mongoose.connect(
        uri,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          ssl: false,
          family: 4,
        },
      );
      console.log('connected to mongo'.green);
      resolve(true);
    } catch (e) {
      console.log('could not connect to mongo'.red);
      if (config.verbose) console.error(e);
      resolve(false);
    }
  });

module.exports = connectDB;
