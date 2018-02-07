process.env['NTBA_FIX_319'] = 1;
const cfg = require('./config');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(cfg.token, {polling: true});
global.botx = bot;
const MongoClient = require('mongodb').MongoClient;

const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');

const { addUser, clearCollection } = require('./methods/dbrequests');
const writexls = require('./methods/xls');
const PORT = process.env.PORT || 80;

app.use(serve('views/public'));

let startServer = async () => {

  try{
    let client = await MongoClient.connect(cfg.mongoUri);
    console.log('Successful connect to db');
    global.collect = client.db('main').collection('users');

    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
    require('./routes')(app);

    // see collection (for dev)
    // let fullCollection = await global.collect.find().toArray();
    // console.log(fullCollection);

    // console.log(await clearCollection());

    // writexls();

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
