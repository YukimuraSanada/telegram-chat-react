module.exports = (userName, collection) => {

  return ( async() => {
    try{
      let res = await collection.findOne({username:userName},{id : true, username : true});
      return {
        id : res.id,
        userName : res.username
      };
      return res;
    }
    catch(err){
      console.log(err);
    }
  })();

};
