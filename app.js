process.env['NTBA_FIX_319'] = 1;
const cfg = require('./config');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(cfg.token, {polling: true});
global.botx = bot;
const MongoClient = require('mongodb').MongoClient;

const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
const http = require('http').Server(app.callback());
global.httpx = http;

const { addUser, clearCollection } = require('./methods/dbrequests');
const PORT = process.env.PORT || cfg.port;

// const io = require('socket.io')(global.httpx);
//
// io.on('connection', socket => {
//   console.log('Connected');
//   socket.on('formSubmit', msg => {
//     console.log('form on serv');
//   });
// });

const socketsListener = require('./webSockets');
socketsListener();

app.use(serve('views/public'));

const startServer = async () => {
  try{
    const client = await MongoClient.connect(cfg.mongoUri);
    console.log('Successful connect to db');
    global.collect = client.db('users').collection('users');

    http.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
    require('./routes')(app);

    bot.on('message', async msg => {
      try{
        const res = await addUser(msg);
        console.log(res.status ? `Add new user ${res.user}` : 'Updating error');
      } catch(err){
        console.dir(err);
      }
    });
  }
  catch(err){
    console.dir(err);
  }
};

startServer();
