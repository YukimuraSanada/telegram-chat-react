//TODO SPLIT TO 2 REDUCERS

const initialState = {
  selectedRowKeys: [],
  isLoading: true,
  inputValue : '',
  filteredData : [],
  findBy : 'Choose field',
  isSearchFromDisabled : true,
  data : [],
  columns : [{
    title: 'Username',
    dataIndex: 'username'
  }, {
    title: 'Id',
    dataIndex: 'id'
  }, {
    title: 'Full Name',
    dataIndex: 'fullname'
  }]
};

export const userTableReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SELECT_TABLE_FIELDS':
    return { ...state, selectedRowKeys : action.payload };
  case 'SUCCESS_REQUEST_TABLE':
    return { ...state, isLoading : false, data : action.payload, filteredData : action.payload };
  case 'ERROR_REQUEST_TABLE':
    return { ...state, isLoading : false };
  case 'START_LOADING_DATA':
    return { ...state, isLoading : true };
  case 'CHANGE_FIND_SELECT':
    return { ...state, findBy : action.payload, isSearchFromDisabled : false };
  case 'CHANGE_INPUT_SELECT':
    return { ...state, inputValue : action.payload };
  case 'FILTER_DATA':
    return { ...state, filteredData : action.payload };

  default:
    return state;
  }
};
