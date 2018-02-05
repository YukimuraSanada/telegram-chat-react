const { getUserId } = require('../dbrequests');

module.exports = async (userName) => {

  let msg;
  let userCart = await getUserId(userName);
  console.log(userCart);
  if (!userCart){
    return msg='unknown username';
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
