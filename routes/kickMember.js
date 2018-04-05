// TODO add parse more then one user


const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const router = new Router();
const { getUsersId } = require('../methods/dbrequests');
const { kickChatMember } = require('../methods/botrequests');
const _ = require('lodash');
const cfg = require('../config');
const cors = require('@koa/cors');

module.exports = app => {

  app.use(bodyParser());
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  });

  app.use(cors());

  router.use('/test', async (ctx, next) => {
    const { textarea : usersString, chatId } = ctx.request.body;
    ctx.chatToKick = chatId;
    ctx.inputArr = usersString.split('\n');
    await next();
  });

  router.use('/test', async (ctx, next) => {
    ctx.inputUsersArr = ctx.inputArr.map( item => {
      return item[0] == '@' ? item : `@${item}`;
    });
    await next();
  });

  router.use('/test', async (ctx, next) => {

    try{
      ctx.userCartArrays = await getUsersId(ctx.inputUsersArr);
      ctx.databaseUsers = ctx.userCartArrays.map( item => item.username );
      ctx.missingDbUsers = _.difference(ctx.inputUsersArr, ctx.databaseUsers);
    }
    catch(err){
      console.log('error on line 51 form.js');
    }
    await next();
  });

  router.post('/test', async ctx => {
    const chunksArr = _.chunk(ctx.userCartArrays, 29);  //inculde arrays of usercart objects

    ctx.kickedUsersArr = [];
    ctx.dontKickedUsersArr = [];

    const { userCartArrays, kickedUsersArr, dontKickedUsersArr, missingDbUsers, chatToKick } = ctx;

    // ADOVYJ KOSTYL'!!!!!!!!!!!
    let sleep = (time, callback) => {
      let stop = new Date().getTime();
      while(new Date().getTime() < stop + time) {
        ;
      }
      callback();
    };

    let i = 0;
    while (i<chunksArr.length){
      //iterates chunks in chunksArr
      for (j=0;j<chunksArr[i].length;j++){
        //iterates usercart objects in chunks
        // console.log(chunksArr[i][j]);
        const rslt =  await kickChatMember(chunksArr[i][j], chatToKick);
        if (rslt.isKicked){
          kickedUsersArr.push(chunksArr[i][j].username);
        }
        else {
          dontKickedUsersArr.push(chunksArr[i][j].username);
        }
      }
      //delay 1 sec here
      sleep(1000, function() {
        i++;
      });

    }

    console.log(`Kicked Users: ${kickedUsersArr}`);
    console.log(`Dont kicked users : ${dontKickedUsersArr}`);
    console.log(`Users miss in database : ${missingDbUsers}`);
    try{
      // await global.botx.sendMessage(cfg.tid, `Kicked Users: ${kickedUsersArr}`);
      // await global.botx.sendMessage(cfg.tid, `Dont kicked users : ${dontKickedUsersArr}`);
      // await global.botx.sendMessage(cfg.tid, `Users miss in database : ${missingDbUsers}`);
    }
    catch(err){
      console.log('error at line 154 form.js');
    }
    ctx.status = 200;
    ctx.body = {
      kickedUsersArr : kickedUsersArr,
      dontKickedUsersArr : dontKickedUsersArr,
      missingDbUsers : missingDbUsers
    };
  });

  app.use(router.routes());

};
