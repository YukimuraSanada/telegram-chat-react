const bodyParser = require('body-parser');
const { getUserId } = require('../databaseQueries');

module.exports = (app,collection) => {

  app.use('/test', bodyParser.json());
  app.use('/test', bodyParser.urlencoded({ extended: true }));
  app.post('/test', (req, res) => {
    let userName = `@${req.body.textarea}`;
    console.log(userName);

    ( async () => {
      try{
        let userCart = await queries.getUserId(userName,collection);
        let ress = await global.botx.sendMessage(userCart.id,userCart.username);
        console.log(ress);
      }
      catch(err){
        console.log(err);
      }
    })();

    res.json({
      status: 200,
      message: 'Ok'
    });
  });

};
