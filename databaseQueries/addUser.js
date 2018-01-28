module.exports = (msg,collection) => {

  let firstName,lastName,fullName,id,userName,eventType;
  eventType = ('new_chat_member' in msg) ? 'new_chat_member' : 'from';
  firstName = msg[eventType].first_name || '';
  lastName = msg[eventType].last_name || '';
  fullName = `${firstName} ${lastName}`;
  id = msg[eventType].id || '';
  userName = msg[eventType].username ? `@${msg[eventType].username}` : 'NoUserName';

  collection.update(
    {id:id},
    {id:id,username:userName,fullname:fullName},
    {upsert:true}
  ).then( res => console.log('Update!'),
    err => console.log('Error'))
    .then( data => console.log('finished'));


  console.log(`new message : ${fullName} ${id} ${userName} : ${msg.text}`);
};
