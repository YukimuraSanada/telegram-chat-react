
const MongoClient = require('mongodb').MongoClient;
const cfg = require('../config');

// let callback = (err,client) => {
//   if(err){
//     return console.log(err);
//   }
//   console.log('Successful Connection to mongo');
//   const collection = client.db('main').collection('users');
//
//   collection.find().toArray( (err,res) =>{
//     err ? console.log(err) : console.log(res);
//   });
//   client.close();
// };
//
// let dbconnect = (func) => {
//
// };
//
// dbconnect(callback);


module.exports.dbconnect = (func) => {
  return MongoClient.connect(cfg.mongoUri, func);
};
