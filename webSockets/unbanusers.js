const _ = require('lodash');

const { getUsersId } = require('../methods/dbrequests');
const { unbanChatMember } = require('../methods/botrequests');

module.exports = io => {
  io.on('connection', socket => {
    console.log('Connected');
    socket.on('UNBAN_USERS_REQUEST', async data => {

      const { textarea, chatId } = data;
      const chatToKick = chatId;
      const inputUsersArr = textarea;
      const userCartArrays = await getUsersId(inputUsersArr);
      const chunksArr = _.chunk(userCartArrays, 29);  //inculde arrays of usercar

      // ADOVYJ KOSTYL'!!!!!!!!!!!
      let sleep = (time, callback) => {
        let stop = new Date().getTime();
        while(new Date().getTime() < stop + time) {
          ;
        }
        callback();
      };

      let i = 0;
      while (i<chunksArr.length){
        //iterates chunks in chunksArr
        for (j=0;j<chunksArr[i].length;j++){
          //iterates usercart objects in chunks
          // console.log(chunksArr[i][j]);
          const rslt =  await unbanChatMember(chunksArr[i][j], chatToKick);
          if (rslt.isBanned){
            socket.emit('UNBAN_USER', chunksArr[i][j].username);
          }
          else {
            socket.emit('DONT_UNBAN_USER', chunksArr[i][j].username);
          }
        }
        //delay 1 sec here
        sleep(1000, function() {
          i++;
        });
      }

      socket.emit('FINISH_REQUEST');

    });
  });
};
