/**
* @async
* Kick user from chat
* @function
* @param {string} userName - telegram username.
* @return {Promise<string>} Promise returns message
*/

const { getUserId } = require('../dbrequests');

module.exports = async (userName) => {

  let msg;
  let userCart = await getUserId(userName);
  console.log(userCart);
  if (!userCart){
    return msg='Unknown username/Not found in Database';
  }
  else {
    try{
      let data = await global.botx.kickChatMember('-1001235195076',userCart.id);
      console.log(data);
      return msg='Successful kicked';
    }
    catch(err){
      return msg='User kick error';
    }
  }

};
