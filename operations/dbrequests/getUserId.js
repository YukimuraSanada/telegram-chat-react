module.exports = (userName) => {

  return global.collect.findOne( {username:userName}, {projection : { _id: 0, 'id': 1, 'username' : 1} });

};
