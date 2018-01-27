const MongoClient = require('mongodb').MongoClient;
const cfg = require('../config');

module.exports = func => {
  return MongoClient.connect(cfg.mongoUri, func);
};
