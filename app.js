process.env["NTBA_FIX_319"] = 1;
const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const MongoClient = require('mongodb').MongoClient;
const bot = new TelegramBot(config.token, {polling: true});
console.log('START...');
const uri = `mongodb://nzvtrk:${config.mongoPass}@cluster0-shard-00-00-obz3f.mongodb.net:27017,cluster0-shard-00-01-obz3f.mongodb.net:27017,cluster0-shard-00-02-obz3f.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`;

let getCollection = (collection) => {
  collection.find().toArray( (err,res)=>{
    if (err) {
      console.log(err);
    }
    console.log(res);
  })
}

// db.collection("dd").remove({});

// MongoClient.connect(uri, function(err, cl ient) {
//   if(err){
//     return console.log(err);
//   }
//   console.log(`Successful Connection to mongo!`);
//   const collection = client.db('test').collection("dd");
//   getCollection(collection);
//   client.close();
// });




bot.on('message', (msg) => {
  let firstName = msg.from.first_name || '';
  let lastName = msg.from.last_name || '';
  let fullName = `${firstName} ${lastName}`
  let id = msg.from.id || '';
  let userName = `@${msg.from.username}` || '';

  MongoClient.connect(uri, function(err, client) {
    if(err){
      return console.log(err);
    }
    console.log(`Successful Connection to mongo!`);
    const collection = client.db('test').collection("dd");
    collection.update(
      {id:id},
      {id:id,username:userName,fullname:fullName},
      {upsert:true}
    )
    client.close();
  });

  console.log(`${fullName} ${lastName} ${id} ${userName} : ${msg.text}`);
});
