const Router = require('koa-router');
const router = new Router();
const cors = require('@koa/cors');

module.exports = app => {

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

  router.get('/users', async (ctx,next) => {
    const fullCollection = await global.collect.find().toArray();

    ctx.body = fullCollection;
    ctx.status = 200;
  });


  app.use(router.routes());

};
