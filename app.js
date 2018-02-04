process.env['NTBA_FIX_319'] = 1;
const cfg = require('./config');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(cfg.token, {polling: true});
global.botx = bot;
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const { addUser, clearCollection } = require('./operations/dbrequests');
const writexls = require('./operations/xls');

app.use(express.static('views/public'));

let startServer = async () => {

  try{
    let client = await MongoClient.connect(cfg.mongoUri);
    console.log('Successful connect to db');
    global.collect = client.db('main').collection('users');

    app.listen(80, () => {
      console.log('listening on *:80');
    });
    require('./routes')(app);

    // // see collection (for dev)
    // let fullCollection = await global.collect.find().toArray();
    // console.log(fullCollection);

    // console.log(await clearCollection());

    writexls();

    bot.on('message', async msg => {
      try{
        let res = await addUser(msg);
        console.log(res ? 'Successful Update' : 'Updating error');
      } catch(err){
        console.log(err);
      }
    });
  }
  catch(err){
    console.log(err);
  }

};



startServer();
