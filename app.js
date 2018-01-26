process.env['NTBA_FIX_319'] = 1;
const TelegramBot = require('node-telegram-bot-api');
const cfg = require('./config');
const MongoClient = require('mongodb').MongoClient;
const bot = new TelegramBot(cfg.token, {polling: true});
const express = require('express');
const app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
require('./routes')(app);

app.use(express.static('views/public'));

http.listen(80, () => {
  console.log('listening on *:80');
});

io.sockets.on('connection', socket => {
  bot.on('message', msg => {
    let firstName,lastName,fullName,id,userName,eventType;
    eventType = ('new_chat_member' in msg) ? 'new_chat_member' : 'from';
    firstName = msg[eventType].first_name || '';
    lastName = msg[eventType].last_name || '';
    fullName = `${firstName} ${lastName}`;
    id = msg[eventType].id || '';
    userName = msg[eventType].username ? `@${msg[eventType].username}` : '';
    // MongoClient.connect(cfg.mongoUri, function(err, client) {
    //   if(err){
    //     return console.log(err);
    //   }
    //   console.log(`Successful Connection to mongo!`);
    //   const collection = client.db('main').collection("users");
    //   collection.update(
    //     {id:id},
    //     {id:id,username:userName,fullname:fullName},
    //     {upsert:true}
    //   )
    //   client.close();
    // });
    let res = `${fullName} ${id} ${userName} : ${msg.text}`;
    console.log(res);
    socket.emit('newUser', res);
  });
});
