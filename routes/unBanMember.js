/** TODO add parse more then one user
* ctx = {
*   inputUsersArr - array of users from front request,
*   databaseUsers - users which include in database
*   missingDbUsers - users which not include in database
* }
*/
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

  router.use('/unban', async (ctx,next) => {

    try{
      ctx.userCartArrays = await getUsersId(ctx.inputUsersArr);
      ctx.databaseUsers = ctx.userCartArrays.map( item => {
        return item.username;
      });
      ctx.missingDbUsers = _.difference(ctx.inputUsersArr, ctx.databaseUsers);
    }
    catch(err){
      console.log('error on line 51 form.js');
    }
    await next();
  });

  router.post('/unban', async ctx => {
    let chunksArr = _.chunk(ctx.userCartArrays, 25);  //inculde arrays of usercart objects

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
        let rslt =  await unbanChatMember(chunksArr[i][j], chatToKick);
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
    console.log(`Users miss in database : ${missingDbUsers}`);
    try{
      // await global.botx.sendMessage(cfg.tid, `Unbanned Users: ${unbannedUsersArr}`);
      // await global.botx.sendMessage(cfg.tid, `Dont Unbanned users : ${dontUnbannedUsersArr}`);
      // await global.botx.sendMessage(cfg.tid, `Users miss in database : ${missingDbUsers}`);
    }
    catch(err){
      console.log('error at line 154 form.js');
    }
    ctx.status = 200;
    ctx.body = {
      unbannedUsersArr : unbannedUsersArr,
      dontUnbannedUsersArr : dontUnbannedUsersArr,
      missingDbUsers : missingDbUsers
    };
  });

  app.use(router.routes());

};
