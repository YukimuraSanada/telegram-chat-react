/** TODO add timer(queue) to kickChatMember (no more 20-30 request in 1 sec), add redis(?) to save this responses for further processing.
* @async
* Kick user from chat
* @function
* @param {string} userName - telegram username.
* @return {Promise<string>} Promise returns message
*/

const { getUsersId } = require('../dbrequests');

module.exports = async userCart => {


//TODO replace check of user for presence in the database to the middleware
  if (!userCart){
    return {
      user : userCart.id,
      message : 'Unknown username/Not found in Database',
      isKicked : 'no'
    };
  }
  else {
    try{
      await global.botx.kickChatMember('-1001235195076',userCart.id);
      return {
        user : userCart.id,
        message : 'Successful kicked',
        isKicked : 'yes'
      };
    }
    catch(err){
      return {
        user : userCart.id,
        message : 'User kick error',
        isKicked : 'no'
      };
    }
  }

};
