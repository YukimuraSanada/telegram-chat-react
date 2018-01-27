const dbconn =  require('./dbConnect');

module.exports = () => {

  dbconn( (err, client) => {
    if(err){
      return console.log(err);
    }
    console.log('Successful Connection to mongo');
    const collection = client.db('main').collection('users');

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
    client.close();
  });

};
