// TODO error handling here!

const bodyParser = require('body-parser');
const { kickChatMember } = require('../operations/botrequests');

module.exports = app => {

  app.use('/test', bodyParser.json());
  app.use('/test', bodyParser.urlencoded({ extended: true }));

  app.post('/test', async (req, res) => {

    try{
      let userName = `@${req.body.textarea}`;
      console.log(userName);

      let q = await kickChatMember(userName);
      console.log(q);

      res.json({
        status: 200,
        message: 'Ok'
      });
    }
    catch(err){
      console.log(err);
      res.json({
        status: 500,
        message: err
      });
    }
  });



};
