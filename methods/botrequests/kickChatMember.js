/** TODO add queue to kickChatMember
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
