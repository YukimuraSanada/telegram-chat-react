const initialState = {
  textareaVal : '',
  selectVal : 'Choose the chat',
  isLoading : false,
  resData : {},
  error : ''
};

export const kickFormReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'USER_FIELD_CHANGE':
    return { ...state, textareaVal : action.payload };
  case 'CHAT_FIELD_CHANGE':
    return { ...state, selectVal : action.payload };
  case 'START_REQUEST':
    return { ...state, isLoading : true, error : '' };
  case 'SUCCESS_REQUEST':
    return { ...state, isLoading : false };
  case 'UPDATE_DATA_AFTER_REQUEST':
    return { ...state, resData : action.payload };
  case 'ERROR_REQUEST':
    return { ...state, isLoading : false, error : action.payload };
  case 'RESET_FORM':
    return { ...state, textareaVal : '' };
  default:
    return state;
  }
};
