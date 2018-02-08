/** TODO add timer(queue) to kickChatMember (no more 20-30 request in 1 sec), add redis to save this responses for further processing.
* @async
* Kick user from chat
* @function
* @param {string} userName - telegram username.
* @return {Promise<string>} Promise returns message
*/

const { getUsersId } = require('../dbrequests');

module.exports = async usersArr => {

  let msg;
  let userCartArrays = await getUsersId(usersArr);
  let userCart = userCartArrays[0];
  console.log(userCart);
  if (!userCart){
    return msg=`Unknown username/Not found in Database - ${userCart.username}`;
  }
  else {
    try{
      let data = await global.botx.kickChatMember('-1001235195076',userCart.id);
      console.log(data);
      return msg=`Successful kicked - ${userCart.username}`;
    }
    catch(err){
      return msg=`User kick error - ${userCart.username}`;
    }
  }

};
