const { getUserId } = require('../dbrequests');

module.exports = (userName) => {

  return (async () => {

    let userCart = await getUserId(userName);
    let data = await global.botx.sendMessage(userCart.id,userCart.username);
    return data;

  })();

};
