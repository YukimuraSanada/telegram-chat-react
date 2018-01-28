const bodyParser = require('body-parser');
const queries = require('../databaseQueries');

module.exports = (app,collection) => {

  app.use('/test', bodyParser.json());
  app.use('/test', bodyParser.urlencoded({ extended: true }));

  app.post('/test', (req, res) => {
    
    let userName = `@${req.body.textarea}`;
    console.log(userName);

    queries.getUserId(userName,collection);

    res.json({
      status: 200,
      message: 'Ok'
    });
  });

};
