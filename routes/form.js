// TODO add parse more then one user

var bodyParser = require('koa-bodyparser');
var Router = require('koa-router');
var router = new Router();
const { getUsersId } = require('../methods/dbrequests');
const { kickChatMember } = require('../methods/botrequests');

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
    ctx.usersArr = usersString.split('\n');

    await next();
  });

  router.use('/test', async (ctx,next) => {

    //TODO compare userIncludes and ctx.userArr
    
    console.log(ctx.usersArr);
    let userCartArrays = await getUsersId(ctx.usersArr);
    console.log(userCartArrays);
    let userIncludes = userCartArrays.map( item => {
      return item.username;
    });
    ctx.userIncludes = userIncludes;

    await next();
  });

  router.post('/test', async ctx => {
    console.log(ctx.userIncludes);

    //TODO split userIncludes and create queue for request to kickChatMember

    // let rslt = await kickChatMember(userCart);

    ctx.status = 200;
    // ctx.body = rslt;
    // console.log(`rslt : ${rslt}`);
  });

  app.use(router.routes());

};
