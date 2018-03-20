const SELECT_MENU_ITEM = 'SELECT_MENU_ITEM';
const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export const selectMenuitem = (val) => {
  return {
    type : SELECT_MENU_ITEM,
    payload :  val
  };
};

export const toggleSidebar = () => {
  return {
    type : TOGGLE_SIDEBAR
  };
};
