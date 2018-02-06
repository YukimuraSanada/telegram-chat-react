/**
* @async
* drop database
* @function
* @return {Promise<string>} Promise returns message
*/

module.exports = async () => {

  let res = await global.collect.count();
  if (res) {
    await global.collect.drop();
    return 'Database successfully dropped';
  }
  else {
    return 'Database is already empty';
  }

};
