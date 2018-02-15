/** TODO add timer(queue) to kickChatMember (no more 20-30 request in 1 sec), add redis(?) to save this responses for further processing.
* @async
* Kick user from chat
* @function
* @param {object} userCart - object of telegram username && id.
* @return {Promise<object>} promise returns object with results
*/

const { getUsersId } = require('../dbrequests');

module.exports = async userCart => {

  try{
    let rslt = await global.botx.kickChatMember('-1001235195076',userCart.id);
    return {
      user : userCart.username,
      message : 'Successful kicked',
      isKicked : true
    };
  }
  catch(err){
    return {
      user : userCart.username,
      message : 'User kick error',
      isKicked : false
    };
  }


};
