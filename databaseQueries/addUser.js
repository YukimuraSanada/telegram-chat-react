module.exports = (msg,collection) => {

  let firstName,lastName,fullName,id,userName,eventType;
  eventType = ('new_chat_member' in msg) ? 'new_chat_member' : 'from';
  firstName = msg[eventType].first_name || '';
  lastName = msg[eventType].last_name || '';
  fullName = `${firstName} ${lastName}`;
  id = msg[eventType].id || '';
  userName = msg[eventType].username ? `@${msg[eventType].username}` : 'NoUserName';

  return (async () =>{
    try{
      let res = await collection.update(
        {id:id},
        {id:id,username:userName,fullname:fullName},
        {upsert:true}
      );
      if (res){
        return 'Successful Update';
      }
    }
    catch(err){
      return err;
    }
  })();

  console.log(`new message : ${fullName} ${id} ${userName} : ${msg.text}`);
};
