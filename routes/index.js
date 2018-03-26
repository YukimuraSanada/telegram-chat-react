module.exports = (app) => {
  require('./kickMember')(app);
  require('./unBanMember')(app);
  require('./users')(app);
};
