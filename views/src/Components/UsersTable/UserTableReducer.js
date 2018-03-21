const initialState = {
  selectedRowKeys: [],
  isLoading: true,
  inputValue : '',
  filteredData : [],
  findBy : 'Choose field',
  isSearchFromDisabled : true
};

export const userTableReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SELECT_TABLE_FIELDS':
    return { ...state, selectedRowKeys : action.payload };
  case 'TOGGLE_SIDEBAR':
    return { ...state, collapsed : !state.collapsed };
  default:
    return state;
  }
};
