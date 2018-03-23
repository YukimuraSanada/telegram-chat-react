/** TODO add timer(queue) to kickChatMember (no more 20-30 request in 1 sec), add redis(?) to save this responses for further processing.
* @async
* Kick user from chat
* @function
* @param {object , string} userCart - object contains username and ID, chat Id.
* @return {Promise<object>} promise returns object with results
*/

const { getUsersId } = require('../dbrequests');

module.exports = async (userCart, chatId) => {

  try{
    let rslt = await global.botx.unbanChatMember(chatId,userCart.id);
    return {
      user : userCart.username,
      message : 'Successful unbanned',
      isBanned : true
    };
  }
  catch(err){
    return {
      user : userCart.username,
      message : 'Unban Error',
      isBanned : false
    };
  }


};
