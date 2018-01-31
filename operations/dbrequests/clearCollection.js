module.exports = () => {

  return (async () => {
    try{
      let res = await global.collect.count();
      if (res) {
        await global.collect.drop();
        return 'Database successfully dropped';
      }
      else {
        return 'Database is already empty';
      }
    }
    catch(err){
      return `Drop database error ${err}`;
    }
  })();

};
