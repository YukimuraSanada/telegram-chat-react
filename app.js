process.env['NTBA_FIX_319'] = 1;
const cfg = require('./config');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(cfg.token, {polling: true});
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const queries = require('./databaseQueries');

app.use(express.static('views/public'));

MongoClient.connect(cfg.mongoUri, (err,client) => {
  if (err){
    console.log(err);
  }
  console.log('Successful connect to db');
  const collect = client.db('main').collection('users');

  app.listen(80, () => {
    console.log('listening on *:80');
  });
  require('./routes')(app,collect);

  queries.getCollection(collect);
  // queries.clearCollection(collect);
  // bot.on('message', msg => {
  //   queries.addUser(msg,collect);
  // });

});
