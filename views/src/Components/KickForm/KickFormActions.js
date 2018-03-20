const USER_FIELD_CHANGE = 'USER_FIELD_CHANGE';
const CHAT_FIELD_CHANGE = 'CHAT_FIELD_CHANGE';
const SUCCESS_REQUEST = 'SUCCESS_REQUEST';
const ERROR_REQUEST = 'ERROR_REQUEST';

export const userFieldChange = (val) => {
  return {
    type : USER_FIELD_CHANGE,
    payload :  val
  };
};

export const chatFieldChange = (val) => {
  return {
    type : CHAT_FIELD_CHANGE,
    payload :  val
  };
};

export const succesRequest = () => {
  return {
    type : SUCCESS_REQUEST,
    payload :  'Form was successfully sent!'
  };
};

export const errorRequest = (val) => {
  return {
    type : ERROR_REQUEST,
    payload :  'An error occurred!'
  };
};
