var Router = require('koa-router');
var router = new Router();

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

  router.get('/users', async (ctx,next) => {
    let fullCollection = await global.collect.find().toArray();

    ctx.body = fullCollection;
    ctx.status = 200;
  });


  app.use(router.routes());

};
