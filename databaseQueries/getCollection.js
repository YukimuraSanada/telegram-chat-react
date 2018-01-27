module.exports = collection => {

  collection.find().toArray( (err,res) =>{
    err ? console.log(err) : console.log(res);
  });

};
