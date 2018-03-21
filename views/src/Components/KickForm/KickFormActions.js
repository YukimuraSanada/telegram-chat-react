const USER_FIELD_CHANGE = 'USER_FIELD_CHANGE';
const CHAT_FIELD_CHANGE = 'CHAT_FIELD_CHANGE';
const SUCCESS_REQUEST = 'SUCCESS_REQUEST';
const ERROR_REQUEST = 'ERROR_REQUEST';
const RESET_FORM = 'RESET_FORM';

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

export const successRequest = () => {
  return {
    type : SUCCESS_REQUEST,
    payload :  'Form was successfully sent!'
  };
};

export const errorRequest = code => {
  return {
    type : ERROR_REQUEST,
    payload :  `An error occurred! ${code.statusText} - ${code.status}`
  };
};

export const resetForm = () => ({
  type : RESET_FORM
});

export const submitForm = data => async (dispatch) => {
  try{
    let res = await axios.post('http://localhost:3030/test', data);
    dispatch(successRequest());
  }
  catch(err){
    dispatch(errorRequest(err.response));
    console.dir(err);
  }
  finally{
    dispatch(resetForm());
  }
};
