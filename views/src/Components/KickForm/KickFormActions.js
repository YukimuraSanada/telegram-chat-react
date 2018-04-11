const USER_FIELD_CHANGE = 'USER_FIELD_CHANGE';
const CHAT_FIELD_CHANGE = 'CHAT_FIELD_CHANGE';
const SUCCESS_REQUEST = 'SUCCESS_REQUEST';
const ERROR_REQUEST = 'ERROR_REQUEST';
const RESET_FORM = 'RESET_FORM';
const START_REQUEST = 'START_REQUEST';
const UPDATE_DATA_AFTER_REQUEST = 'UPDATE_DATA_AFTER_REQUEST';

const UPDATE_KICKED_USERS = 'UPDATE_KICKED_USERS';
const UPDATE_DONT_KICKED_USERS = 'UPDATE_DONT_KICKED_USERS';
const UPDATE_MISSING_DB_USERS = 'UPDATE_MISSING_DB_USERS';

import { notification } from 'antd';
import axios from 'axios';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3030');

export const userFieldChange = val => {
  return {
    type : USER_FIELD_CHANGE,
    payload :  val
  };
};

export const chatFieldChange = val => {
  return {
    type : CHAT_FIELD_CHANGE,
    payload :  val
  };
};

export const successRequest = {
  type : SUCCESS_REQUEST
};

export const errorRequest = err => {
  return {
    type : ERROR_REQUEST,
    payload : err
  };
};

export const startRequest = {
  type : START_REQUEST
};

export const resetForm = {
  type : RESET_FORM
};


const notificationSuccess = () => {
  notification.success({
    message: 'Success!',
    duration : 3
  });
};

const notificationError = (err) => {
  notification.error({
    message: 'Error!',
    description : `${err}`,
    duration : 3
  });
};


export const submitForm = data =>  dispatch => {

  socket.emit('KICK_USERS_REQUEST', data);

  socket.on('DONT_KICK_USER', msg => {
    console.log('DONT_KICK_USER', msg);
    dispatch(updateDontKickedUsers(msg));
  });
  socket.on('KICK_USER', msg => {
    console.log('KICK_USER', msg);
    dispatch(updateKickedUsers(msg));
  });
  socket.on('MISSING_DB_USERS', msg => {
    console.log('MISSING_DB_USERS', msg);
    dispatch(updateMissingDBUsers(msg));
  });
  socket.on('FINISH_REQUEST', () => {
    notificationSuccess();
    dispatch(resetForm);
  });

};

export const updateKickedUsers = user => {
  return {
    type : UPDATE_KICKED_USERS,
    payload :  user
  };
};

export const updateDontKickedUsers = user => {
  return {
    type : UPDATE_DONT_KICKED_USERS,
    payload :  user
  };
};

export const updateMissingDBUsers = users => {
  return {
    type : UPDATE_MISSING_DB_USERS,
    payload :  users
  };
};


export const unban = data => dispatch => {

  socket.emit('UNBAN_USERS_REQUEST', data);

  socket.on('UNBAN_USER', msg => {
    console.log('UNBAN_USER', msg);
  });
  socket.on('DONT_UNBAN_USER', msg => {
    console.log('DONT_UNBAN_USER', msg);
  });

  socket.on('FINISH_REQUEST', () => {
    notificationSuccess();
  });

};
