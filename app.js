process.env['NTBA_FIX_319'] = 1;
const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const MongoClient = require('mongodb').MongoClient;
const bot = new TelegramBot(config.token, {polling: true});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

http.listen(80, function(){
  console.log('listening on *:80');
});

app.post('/test', function (req, res) {
  console.log(req.body.textarea);
  res.json({
    status: 200,
    message: 'Ok'
  });
});

io.sockets.on('connection', function (socket) {
  bot.on('message', (msg) => {
    let firstName,lastName,fullName,id,userName,eventType;
    eventType = ('new_chat_member' in msg) ? 'new_chat_member' : 'from';
    firstName = msg[eventType].first_name || '';
    lastName = msg[eventType].last_name || '';
    fullName = `${firstName} ${lastName}`;
    id = msg[eventType].id || '';
    userName = msg[eventType].username ? `@${msg[eventType].username}` : '';
    // MongoClient.connect(config.mongoUri, function(err, client) {
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
