const initialState = {
  textareaVal : '',
  selectVal : 'Choose the chat',
  isLoading : false,
  kickedUsersArr : [],
  dontKickedUsersArr : [],
  missingDbUsers : [],
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
  case 'UPDATE_DONT_KICKED_USERS':
    return { ...state, dontKickedUsersArr : [ ...state.dontKickedUsersArr, action.payload] };
  case 'UPDATE_KICKED_USERS':
    return { ...state, kickedUsersArr : [ ...state.kickedUsersArr, action.payload] };
  case 'UPDATE_MISSING_DB_USERS':
    return { ...state, missingDbUsers : action.payload };
  case 'ERROR_REQUEST':
    return { ...state, isLoading : false, error : action.payload };
  case 'RESET_FORM':
    return { ...state, textareaVal : '' };
  default:
    return state;
  }
};
