const initialState = {
  textareaVal : '',
  selectVal : 'Choose the chat',
  res : ''
};

export const kickFormReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'USER_FIELD_CHANGE':
    return { ...state, textareaVal : action.payload };
  case 'CHAT_FIELD_CHANGE':
    return { ...state, selectVal : action.payload };
  case 'SUCCESS_REQUEST':
    return { ...state, res : action.payload };
  case 'CHAT_FIELD_CHANGE':
    return { ...state, res : action.payload };
  default:
    return state;
  }
};
