const bodyParser = require('body-parser');
const queries = require('../databaseQueries');

module.exports = (app,collection) => {

  app.use('/test', bodyParser.json());
  app.use('/test', bodyParser.urlencoded({ extended: true }));
  app.post('/test', (req, res) => {
    let userName = `@${req.body.textarea}`;
    console.log(userName);

    let fullRequest = async () => {
      let userCart = await queries.getUserId(userName,collection);
      let ress = await global.botx.sendMessage(userCart.id,userCart.username);
      console.log(ress);
    };
    fullRequest();

    // queries.getUserId(userName,collection)
    //   .then( res => {
    //     console.log(res);
    //     return global.botx.sendMessage(res,'Hello!');
    //   })
    //   .then(
    //     data => console.log(data)
    //   )
    //   .catch(
    //     err => console.log(err)
    //   );

    res.json({
      status: 200,
      message: 'Ok'
    });
  });

};
