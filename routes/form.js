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

    let userCartArrays = await getUsersId(ctx.inputUsersArr);
    // console.log(userCartArrays);
    let databaseUsers = userCartArrays.map( item => {
      return item.username;
    });
    ctx.databaseUsers = databaseUsers;

    ctx.missingDbUsers = _.difference(ctx.inputUsersArr, ctx.databaseUsers);
    console.log(ctx.missingDbUsers);
    // console.log(`MISSING DB USERS : ${missingDbUsers}`);

    await next();
  });

  router.post('/test', async ctx => {
    // console.log(`ARRAY USERS FROM DATABASE: ${ctx.databaseUsers}`);

    //TODO split userIncludes and create queue for request to kickChatMember /use lodash chunk for split

    // let rslt = await kickChatMember(userCart);

    ctx.status = 200;
    // ctx.body = rslt;
    // console.log(`rslt : ${rslt}`);
  });

  app.use(router.routes());

};
