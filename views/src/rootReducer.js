import { combineReducers } from 'redux';
import { pageReducer } from 'src/Components/Sidebar/SidebarReducer';
import { kickFormReducer } from 'src/Components/KickForm/KickFormReducers';
import { userTableReducer   } from 'src/Components/UsersTable/UserTableReducer';

export default combineReducers({
  sidebarState : pageReducer,
  kickFormState : kickFormReducer,
  userTableState : userTableReducer
});
