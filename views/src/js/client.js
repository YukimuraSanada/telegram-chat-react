import io from 'socket.io-client';
import axios from 'axios';
import mui from 'muicss/dist/js/mui';
import '../css/style.scss';

window.onload = () => {
  //socket  for display  updates list
  let socket = io.connect('http://localhost');
  socket.on('newUser', function (data) {
    console.log(data);
  });

  //ajax form
  let form = document.querySelector('form');

  let resetform = el =>{
    el.reset();
    el.querySelectorAll('input').forEach( i => {
      i.classList.remove('mui--is-not-empty');
    });
    el.querySelector('textarea').classList.remove('mui--is-not-empty');
  };

  form.onsubmit = e => {
    e.preventDefault();
    let res = document.querySelector('.result');
    axios({
      method: 'POST',
      url: '/test',
      data: {
        'input1': document.querySelector('input[name="input1"]').value,
        'input2': document.querySelector('input[name="input2"]').value,
        'textarea': document.querySelector('textarea[name="textarea"]').value
      }
    }).then( () => {
      res.innerHTML = 'Form was successfully sent!';
      resetform(form);
    }).catch( ()=> {
      res.innerHTML = 'An error occurred!';
      resetform(form);
    });
  };
};
