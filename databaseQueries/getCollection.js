module.exports = collection => {

  return (async () => {
    try{
      return await collection.find().toArray();
    }
    catch(err){
      console.log(err);
    }
  })();

};
