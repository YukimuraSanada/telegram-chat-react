const bodyParser = require('body-parser');
const { kickChatMember } = require('../operations/botrequests');

module.exports = (app) => {

  app.use('/test', bodyParser.json());
  app.use('/test', bodyParser.urlencoded({ extended: true }));
  app.post('/test', (req, res) => {
    let userName = `@${req.body.textarea}`;
    console.log(userName);

    // TODO error handling here!

    (async () => {
      try{
        await kickChatMember(userName);
        res.json({
          status: 200,
          message: 'Ok'
        });
      }
      catch(err){
        res.json({
          status: 500,
          message: `userName ${userName} doesnt exist. ${err}`
        });
      }

    })();


  });

};
