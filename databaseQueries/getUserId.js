module.exports = (userName, collection) => {

  collection.find({username:userName}, {id:true}).toArray( (err,res) => {
    if (err) {
      console.log(err);
    };
    res.forEach(doc => {
      console.log(doc.id);
    });
  });

};
