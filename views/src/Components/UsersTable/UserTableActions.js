const SELECT_TABLE_FIELDS = 'SELECT_TABLE_FIELDS';
const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export const selectTableFields = (val) => {
  return {
    type : SELECT_TABLE_FIELDS,
    payload :  val
  };
};

export const toggleSidebar = () => {
  return {
    type : TOGGLE_SIDEBAR
  };
};
