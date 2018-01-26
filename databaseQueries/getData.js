const MongoClient = require('mongodb').MongoClient;
const cfg = require('../config');

module.exports = () => {

  MongoClient.connect(cfg.mongoUri, function(err, client) {
    if(err){
      return console.log(err);
    }
    console.log('Successful Connection to mongo');
    const collection = client.db('main').collection('users');

    collection.find().toArray( (err,res) =>{
      err ? console.log(err) : console.log(res);
    });
    client.close();
  });

};
