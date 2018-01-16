process.env["NTBA_FIX_319"] = 1;
const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const MongoClient = require('mongodb').MongoClient;
const bot = new TelegramBot(config.token, {polling: true});

console.log('START...');

var uri = `mongodb+srv://nzvtrk:${config.mongoPass}@cluster0-obz3f.mongodb.net/test`;
MongoClient.connect(uri, function(err, client) {
  if(err){
          return console.log(err);
      }
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});

bot.on('message', (msg) => {
  let firstName = msg.from.first_name || '';
  let lastName = msg.from.last_name || '';
  let fullName = `${firstName} ${lastName}`
  let id = msg.from.id || '';
  let username = `@${msg.from.username}` || '';
  console.log(`${fullName} ${lastName} ${id} ${username} : ${msg.text}`);
 });
