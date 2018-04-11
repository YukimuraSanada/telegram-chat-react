const io = require('socket.io')(global.httpx);

module.exports = () => {
  require('./kickusers')(io);
  require('./unbanusers')(io);
};
