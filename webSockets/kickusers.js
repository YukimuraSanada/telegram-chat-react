const _ = require('lodash');

const { getUsersId } = require('../methods/dbrequests');
const { kickChatMember } = require('../methods/botrequests');

module.exports = io => {
  io.on('connection', socket => {
    console.log('Connected');

    socket.on('KICK_USERS_REQUEST', async data => {

      console.log('form on serv' , data);
      const { textarea : usersString, chatId } = data;
      const chatToKick = chatId;
      const inputArr = usersString.split('\n');
      const inputUsersArr = inputArr.map( item => {
        return item[0] == '@' ? item : `@${item}`;
      });

      const userCartArrays = await getUsersId(inputUsersArr);

      const databaseUsers = userCartArrays.map( item => item.username );
      const missingDbUsers = _.difference(inputUsersArr, databaseUsers);

      socket.emit('MISSING_DB_USERS', missingDbUsers);

      const chunksArr = _.chunk(userCartArrays, 29);  //inculde arrays of usercart objects

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
          const rslt =  await kickChatMember(chunksArr[i][j], chatToKick);
          if (rslt.isKicked){
            socket.emit('KICK_USER', chunksArr[i][j].username);
          }
          else {
            socket.emit('DONT_KICK_USER', chunksArr[i][j].username);
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
