// TODO add parse more then one user

var bodyParser = require('koa-bodyparser');
var Router = require('koa-router');
var router = new Router();

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

  router.post('/test', async ctx => {
    let userName = `@${ctx.request.body.textarea}`;
    let usersArr = [userName];
    console.log(ctx.request.body);

    let rslt = await kickChatMember(usersArr);

    ctx.status = 200;
    ctx.body = rslt;
  });

  app.use(router.routes());

};
