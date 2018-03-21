const SELECT_TABLE_FIELDS = 'SELECT_TABLE_FIELDS';
const START_LOADING_DATA = 'START_LOADING_DATA';
const SUCCESS_REQUEST_TABLE = 'SUCCESS_REQUEST_TABLE';
const ERROR_REQUEST_TABLE = 'ERROR_REQUEST_TABLE';
const CHANGE_FIND_SELECT = 'CHANGE_FIND_SELECT';
const CHANGE_INPUT_SELECT = 'CHANGE_INPUT_SELECT';
const FILTER_DATA = 'FILTER_DATA';


import axios from 'axios';
import React from 'react';

export const selectTableFields = (val) => {
  return {
    type : SELECT_TABLE_FIELDS,
    payload :  val
  };
};

export const startLoading =  {
  type : START_LOADING_DATA
};

export const succesRequestTable = (val) => {
  return {
    type : SUCCESS_REQUEST_TABLE,
    payload : val
  };
};

export const errorRequestTable = () => {
  return {
    type : ERROR_REQUEST_TABLE
  };
};

export const changeFindSelect = (val) => {
  return {
    type : CHANGE_FIND_SELECT,
    payload : val
  };
};

export const changeFindInput = (val) => {
  return {
    type : CHANGE_INPUT_SELECT,
    payload : val
  };
};

export const filterData = (val) => {
  return {
    type : FILTER_DATA,
    payload : val
  };
};

export const loadingData = () => async (dispatch) => {

  dispatch(startLoading);
  try{
    let rslt = await axios.get('http://localhost:3030/users');
    dispatch(succesRequestTable(rslt.data));
  }
  catch(err){
    dispatch(errorRequestTable());
  }

};

export const onFindUsersAction = query => dispatch => {

  const { inputValue, findBy, data } = query;
  const reg = new RegExp( inputValue, 'gi');
  let newData = data.map( item => {
    const match = item[findBy].match(reg);
    if (!match) {
      return null;
    }

    if (findBy == 'username'){
      return {
        ...item,
        username : (
          <span>
            {item[findBy].split(reg).map((text, i) => (
              i > 0 ? [<span key={item._id} style={{backgroundColor: '#dff0ff'}}>{match[0]}</span>, text] : text
            ))}
          </span>
        )
      };
    }
    else {
      return {
        ...item,
        fullname : (
          <span>
            {item[findBy].split(reg).map((text, i) => (
              i > 0 ? [<span key={item._id} style={{backgroundColor: '#dff0ff'}}>{match[0]}</span>, text] : text
            ))}
          </span>
        )
      };
    }

  }).filter(item => !!item);

  dispatch(filterData(newData));
};
