/** TODO add parse more then one user
* ctx = {
*   inputUsersArr - array of users from front request,
*   databaseUsers - users which include in database
*   missingDbUsers - users which not include in database
* }
*/
var bodyParser = require('koa-bodyparser');
var Router = require('koa-router');
var router = new Router();
const { getUsersId } = require('../methods/dbrequests');
const { kickChatMember } = require('../methods/botrequests');
const _ = require('lodash');

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

  router.use('/test', async (ctx,next) => {
    let usersString = ctx.request.body.textarea;
    ctx.inputUsersArr = usersString.split('\n');
    await next();
  });

  router.use('/test', async (ctx,next) => {
    console.log(`INPUT ARR : ${ctx.inputUsersArr}`);
    ctx.userCartArrays = await getUsersId(ctx.inputUsersArr);
    // console.log(ctx.userCartArrays);
    ctx.databaseUsers = ctx.userCartArrays.map( item => {
      return item.username;
    });
    ctx.missingDbUsers = _.difference(ctx.inputUsersArr, ctx.databaseUsers);  //write this to xls with label "not found in db"
    // console.log(`MISSING DB USERS : ${missingDbUsers}`);
    await next();
  });

  router.post('/test', async ctx => {
    // console.log(`ARRAY USERS FROM DATABASE: ${ctx.databaseUsers}`);
    //TODO add 1 sec delay across the chunks sending THIS IS SHIT
    let chunksArr = _.chunk(ctx.userCartArrays, 1);  //inculde arrays of usercart objects

    // console.log(chunksArr);
    ctx.kickedUsersArr = [];
    ctx.dontKickedUsersArr = [];

    for (i=0;i<chunksArr.length;i++){
      //iterates chunks in chunksArr
      for (j=0;j<chunksArr[i].length;j++){
        //iterates usercart objects in chunks
        // console.log(chunksArr[i][j]);
        let rslt =  await kickChatMember(chunksArr[i][j]);
        if (rslt.isKicked){
          ctx.kickedUsersArr.push(chunksArr[i][j].username);
        }
        else {
          ctx.dontKickedUsersArr.push(chunksArr[i][j].username);
        }
      }

      //delay 1 sec here
    }
    console.log(`Kicked Users: ${ctx.kickedUsersArr}`);
    console.log(`Dont kicked users : ${ctx.dontKickedUsersArr}`);
    console.log(`Users miss in database : ${ctx.missingDbUsers}`);
    // let rslt = await kickChatMember(userCart);
    ctx.status = 200;
    // ctx.body = rslt;
  });

  app.use(router.routes());

};
