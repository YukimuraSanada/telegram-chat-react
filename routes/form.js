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

  router.use('/test', async (ctx,next) => {
    let usersString = ctx.request.body.textarea;
    ctx.chatToKick = ctx.request.body.chatId;
    ctx.inputUsersArr = usersString.split('\n');
    await next();
  });

  router.use('/test', async (ctx,next) => {
    console.log(`INPUT ARR : ${ctx.inputUsersArr}`);

    try{
      ctx.userCartArrays = await getUsersId(ctx.inputUsersArr);
      ctx.databaseUsers = ctx.userCartArrays.map( item => {
        return item.username;
      });
      ctx.missingDbUsers = _.difference(ctx.inputUsersArr, ctx.databaseUsers);
    }
    catch(err){
      console.log('error on line 47 form.js');
    }
    await next();
  });

  router.post('/test', async (ctx, next) => {

    let chunksArr = _.chunk(ctx.userCartArrays, 20);  //inculde arrays of usercart objects
    ctx.kickedUsersArr = [];
    ctx.dontKickedUsersArr = [];

    function* gen() {
      let i =0;
      while (i<chunksArr.length){
        //iterates chunks in chunksArr
        yield (async function(){
          for (j=0;j<chunksArr[i].length;j++){
            //iterates usercart objects in chunks
            let rslt =  await kickChatMember(chunksArr[i][j], ctx.chatToKick);
            if (rslt.isKicked){
              ctx.kickedUsersArr.push(chunksArr[i][j].username);
            }
            else {
              ctx.dontKickedUsersArr.push(chunksArr[i][j].username);
            }
          }
          i++;
        })();
      }
      yield (async function(){
        clearInterval(tmer);
        console.log(`Kicked Users: ${ctx.kickedUsersArr}`);
        console.log(`Dont kicked users : ${ctx.dontKickedUsersArr}`);
        console.log(`Users miss in database : ${ctx.missingDbUsers}`);
        try{
          await global.botx.sendMessage(cfg.tid, `Kicked Users: ${ctx.kickedUsersArr}`);
          await global.botx.sendMessage(cfg.tid, `Dont kicked users : ${ctx.dontKickedUsersArr}`);
          await global.botx.sendMessage(cfg.tid, `Users miss in database : ${ctx.missingDbUsers}`);
        }
        catch(err){
          console.log('error on line 87 form.js');
        }
      })();
    }

    let iter = gen();
    let tmer = setInterval(function () {
      let rs = iter.next();
    }, 1000);

    ctx.status = 200;
  });

  app.use(router.routes());

};
