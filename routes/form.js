const bodyParser = require('body-parser');

module.exports = app => {

  app.use('/test', bodyParser.json());
  app.use('/test', bodyParser.urlencoded({ extended: true }));

  app.post('/test', (req, res) => {
    console.log(req.body.textarea);
    res.json({
      status: 200,
      message: 'Ok'
    });
  });

};
