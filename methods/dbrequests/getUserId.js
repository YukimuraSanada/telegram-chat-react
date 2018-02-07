/**
* @async
* Get userId from database
* @function
* @param {string} userName
* @return {Promise<array>} Promise returns array contains users object
*/

module.exports = async array => {
  let data = await global.collect.find( {username: { $in : array }}, {projection : { _id: 0, 'id': 1, 'username' : 1} });
  let rslt = await data.toArray();
  return rslt;
};
