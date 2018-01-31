const { getUserId } = require('../dbrequests');

module.exports = (userName) => {

  return (async () => {

    let userCart = await getUserId(userName);
    console.log(userCart);
    let data = await global.botx.sendMessage(userCart.id,userCart.username);
    // let data = await global.botx.kickChatMember('394873215',userCart.id);
    return data;

  })();

};
