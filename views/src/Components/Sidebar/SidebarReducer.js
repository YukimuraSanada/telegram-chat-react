const initialState = {
  collapsed: true,
  selectedItem : 1
};

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SELECT_MENU_ITEM':
    return { ...state, selectedItem : action.payload };
  case 'TOGGLE_SIDEBAR':
    return { ...state, collapsed : !state.collapsed };
  default:
    return state;
  }
};
