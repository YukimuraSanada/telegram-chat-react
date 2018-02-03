const { getUserId } = require('../dbrequests');

module.exports = async (userName) => {

  let userCart = await getUserId(userName);
  console.log(userCart);
  // let data = await global.botx.sendMessage(394873215,userName);
  let data = await global.botx.kickChatMember('394873215',userCart.id);
  return data;

};
