/** TODO exclude username from query and add it from array
* @async
* Get userId from database
* @function
* @param {array} array of usernames
* @return {Promise<array>} Promise returns array contains users object
*/

module.exports = async array => {
  const data = await global.collect.find( {username: { $in : array }}, {projection : { _id: 0, 'id': 1, 'username' : 1} });
  return await data.toArray();
};
