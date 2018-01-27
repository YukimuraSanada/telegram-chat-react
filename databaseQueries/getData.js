const dbconn =  require('./dbConnect');

module.exports = () => {

  dbconn( (err, client) => {
    if(err){
      return console.log(err);
    }
    console.log('Successful Connection to mongo');
    const collection = client.db('main').collection('users');

    collection.find().toArray( (err,res) =>{
      err ? console.log(err) : console.log(res);
    });
    client.close();
  });

};
