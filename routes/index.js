module.exports = (app) => {
  require('./kickmember')(app);
  require('./unBanMember')(app);
  require('./users')(app);
};
