module.exports = collection => {

  collection.count().then(
    res => {
      if (res) {
        collection.drop();
        console.log('Database successfully dropped');
      }
      else {
        console.log('Database is already empty');
      }
    }
  );

};
