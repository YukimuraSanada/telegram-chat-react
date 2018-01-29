module.exports = (userName, collection) => {

  return new Promise( (resolve, reject) => {

    collection.find({username:userName}, {id:true}).toArray( (err,res) => {
      if (err) {
        reject(err);
      };
      res.forEach(doc => {
        resolve({
          username : userName,
          id : doc.id  
        });
      });
    });

  });

};
