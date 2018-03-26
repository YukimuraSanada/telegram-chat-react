const USER_FIELD_CHANGE = 'USER_FIELD_CHANGE';
const CHAT_FIELD_CHANGE = 'CHAT_FIELD_CHANGE';
const SUCCESS_REQUEST = 'SUCCESS_REQUEST';
const ERROR_REQUEST = 'ERROR_REQUEST';
const RESET_FORM = 'RESET_FORM';
const START_REQUEST = 'START_REQUEST';
const UPDATE_DATA_AFTER_REQUEST = 'UPDATE_DATA_AFTER_REQUEST';

import axios from 'axios';

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

export const updateDataAfterSuccess = req => {
  return {
    type : UPDATE_DATA_AFTER_REQUEST,
    payload :  req
  };
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

export const submitForm = data => async dispatch => {
  try{
    dispatch(startRequest);
    let res = await axios.post('http://localhost:3030/test', data);
    dispatch(updateDataAfterSuccess(res.data));
    dispatch(successRequest);
  }
  catch(err){
    console.dir(err);
    dispatch(errorRequest(err.message));
  }
  finally{
    dispatch(resetForm);
  }
};

export const unban = data => async dispatch => {
  try{
    dispatch(startRequest);
    let res = await axios.post('http://localhost:3030/unban', data);
    console.log(res);
    dispatch(successRequest);
  }
  catch(err){
    console.dir(err);
    dispatch(errorRequest(err.message));
  }
  finally{
    dispatch(resetForm);
  }
};
