module.exports = (userName, collection) => {

  return new Promise( (resolve, reject) => {

    collection.find({username:userName}, {id:true}).toArray()
      .then( res => {
        res.forEach(doc => {
          resolve({
            username : userName,
            id : doc.id
          });
        });
      })
      .catch( err => {
        reject(err);
      });

  });

};
