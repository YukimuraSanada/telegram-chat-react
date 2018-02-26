module.exports = (app) => {
  require('./form')(app);
  require('./users')(app);
};
