module.exports = collection => {

  return (async () => {
    try{
      let res = await collection.count();
      if (res) {
        await collection.drop();
        return 'Database successfully dropped';
      }
      else {
        return 'Database is already empty';
      }
    }
    catch(err){
      console.log(err);
    }
  })();

};
