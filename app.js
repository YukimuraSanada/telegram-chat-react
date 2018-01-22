// process.env["NTBA_FIX_319"] = 1;
// const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const MongoClient = require('mongodb').MongoClient;
// const bot = new TelegramBot(config.token, {polling: true});
console.log('START...');


// db.collection("dd").remove({});

MongoClient.connect(config.mongoUri, function(err, client) {
  if(err){
    return console.log(err);
  }
  console.log(`Successful Connection to mongo!`);
  const collection = client.db('foo').collection("dd");

      collection.update(
        {id:'sdsds'},
        {id:'sdsds',username:'dddd',fullname:'dddd'},
        {upsert:true}
      )

    collection.find().toArray( (err,res)=>{
    err ? console.log(err) : console.log(res);
  })

  client.close();
});




//
// bot.on('message', (msg) => {
//   let firstName = msg.from.first_name || '';
//   let lastName = msg.from.last_name || '';
//   let fullName = `${firstName} ${lastName}`
//   let id = msg.from.id || '';
//   let userName = `@${msg.from.username}` || '';
//
//   MongoClient.connect(config.mongoUri, function(err, client) {
//     if(err){
//       return console.log(err);
//     }
//     console.log(`Successful Connection to mongo!`);
//     const collection = client.db('test').collection("dd");
//     collection.update(
//       {id:id},
//       {id:id,username:userName,fullname:fullName},
//       {upsert:true}
//     )
//     client.close();
//   });
//
//   console.log(`${fullName} ${lastName} ${id} ${userName} : ${msg.text}`);
// });
