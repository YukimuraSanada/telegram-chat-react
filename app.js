// process.env["NTBA_FIX_319"] = 1;
// const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const MongoClient = require('mongodb').MongoClient;
// const bot = new TelegramBot(config.token, {polling: true});
console.log('START...');
const uri = `mongodb://nzvtrk:${config.mongoPass}@cluster0-shard-00-00-obz3f.mongodb.net:27017,cluster0-shard-00-01-obz3f.mongodb.net:27017,cluster0-shard-00-02-obz3f.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`;

MongoClient.connect(uri, function(err, client) {
  if(err){
    return console.log(err);
  }
  console.log(`Successful Connection to mongo!`);

  const collection = client.db("test").collection("dd");
  //Get all collection
  collection.find().toArray( (err,res) =>{
    err ? console.log(err) : console.log(res);
  })
  // Add uniq document
  // collection.update({name : "adsaadsq"}, {name: "qsadsdd", age : 25}, {upsert: true})

  client.close();
});

// bot.on('message', (msg) => {
//   let firstName = msg.from.first_name || '';
//   let lastName = msg.from.last_name || '';
//   let fullName = `${firstName} ${lastName}`
//   let id = msg.from.id || '';
//   let username = `@${msg.from.username}` || '';
//   console.log(`${fullName} ${lastName} ${id} ${username} : ${msg.text}`);
//  });
