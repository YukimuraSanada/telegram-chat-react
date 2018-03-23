const initialState = {
  collapsed: true
};

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'TOGGLE_SIDEBAR':
    return { ...state, collapsed : !state.collapsed };
  default:
    return state;
  }
};
