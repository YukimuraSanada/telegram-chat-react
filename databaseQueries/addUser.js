const MongoClient = require('mongodb').MongoClient;
const cfg = require('../config');

module.exports = msg =>{
  let firstName,lastName,fullName,id,userName,eventType;
  eventType = ('new_chat_member' in msg) ? 'new_chat_member' : 'from';
  firstName = msg[eventType].first_name || '';
  lastName = msg[eventType].last_name || '';
  fullName = `${firstName} ${lastName}`;
  id = msg[eventType].id || '';
  userName = msg[eventType].username ? `@${msg[eventType].username}` : '';
  MongoClient.connect(cfg.mongoUri, function(err, client) {
    if(err){
      return console.log(err);
    }
    const collection = client.db('main').collection('users');
    collection.update(
      {id:id},
      {id:id,username:userName,fullname:fullName},
      {upsert:true}
    );
    client.close();
  });
  let res = `new message : ${fullName} ${id} ${userName} : ${msg.text}`;
  console.log(res);
};
