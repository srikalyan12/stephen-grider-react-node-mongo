const mongoose = require('mongoose');

const keys = require('../config/keys');

module.exports = async () => {
  try {
    const connection = await mongoose.connect(keys.MongoDBURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Data Base Connected');
  } catch (error) {
    console.log('Eror while connecting database', error);
    process.exit(1);
  }
};
