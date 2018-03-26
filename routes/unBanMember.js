// TODO add parse more then one user

const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const router = new Router();
const { getUsersId } = require('../methods/dbrequests');
const { unbanChatMember } = require('../methods/botrequests');
const _ = require('lodash');
const cfg = require('../config');
const cors = require('@koa/cors');

module.exports = app => {

  app.use(bodyParser());
  app.use(cors());

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  });


  router.use('/unban', async (ctx,next) => {
    const { textarea, chatId } = ctx.request.body;
    ctx.chatToKick = chatId;
    ctx.inputUsersArr = textarea;
    await next();
  });

  router.post('/unban', async ctx => {
    try{
      ctx.userCartArrays = await getUsersId(ctx.inputUsersArr);
    }
    catch(err){
      console.log('error on line 40 unBanMember.js');
    }

    const chunksArr = _.chunk(ctx.userCartArrays, 29);  //inculde arrays of usercart objects

    ctx.unbannedUsersArr = [];
    ctx.dontUnbannedUsersArr = [];

    const { userCartArrays, unbannedUsersArr, dontUnbannedUsersArr, missingDbUsers, chatToKick } = ctx;

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
        const rslt =  await unbanChatMember(chunksArr[i][j], chatToKick);
        if (rslt.isBanned){
          unbannedUsersArr.push(chunksArr[i][j].username);
        }
        else {
          dontUnbannedUsersArr.push(chunksArr[i][j].username);
        }
      }
      //delay 1 sec here
      sleep(1000, function() {
        i++;
      });

    }

    console.log(`Unbanned Users: ${unbannedUsersArr}`);
    console.log(`Dont Unbanned users : ${dontUnbannedUsersArr}`);
    try{
      // await global.botx.sendMessage(cfg.tid, `Unbanned Users: ${unbannedUsersArr}`);
      // await global.botx.sendMessage(cfg.tid, `Dont Unbanned users : ${dontUnbannedUsersArr}`);
    }
    catch(err){
      console.log('error at line 88 unBanMember.js');
    }
    ctx.status = 200;
    ctx.body = {
      unbannedUsersArr : unbannedUsersArr,
      dontUnbannedUsersArr : dontUnbannedUsersArr
    };
  });

  app.use(router.routes());

};
