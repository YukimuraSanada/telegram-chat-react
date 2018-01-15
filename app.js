process.env["NTBA_FIX_319"] = 1;

const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const token = config.token;


const bot = new TelegramBot(token, {polling: true});

console.log('hello');


bot.getMe().then((data)=>{
  console.log(data);
})

bot.on('message', (msg) => {
  let firstName = msg.from.first_name || '';
  let lastName = msg.from.last_name || '';
  let fullName = `${firstName} ${lastName}`
  let id = msg.from.id || '';
  let username = `@${msg.from.username}` || '';
  console.log(`${fullName} ${lastName} ${id} ${username}`);
});
