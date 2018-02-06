/**
* @async
* Get userId from database
* @function
* @param {string} userName
* @return {Promise<object>} Promise returns object contains username and userId
*/

module.exports = (userName) => {

  return global.collect.findOne( {username:userName}, {projection : { _id: 0, 'id': 1, 'username' : 1} });

};
