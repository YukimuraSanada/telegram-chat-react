process.env['NTBA_FIX_319'] = 1;
const cfg = require('./config');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(cfg.token, {polling: true});
const express = require('express');
const app = express();

const queries = require('./databaseQueries');
require('./routes')(app);

app.use(express.static('views/public'));

app.listen(80, () => {
  console.log('listening on *:80');
});

queries.getData();
// queries.clear();
// bot.on('message', msg => {
//   queries.addUser(msg);
// });
