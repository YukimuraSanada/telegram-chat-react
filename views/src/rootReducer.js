import { combineReducers } from 'redux';
import { pageReducer } from './Components/Sidebar/SidebarReducer';
import { kickFormReducer } from './Components/KickForm/KickFormReducers';
import { userTableReducer   } from './Components/UsersTable/UserTableReducer';

export default combineReducers({
  sidebarState : pageReducer,
  kickFormState : kickFormReducer,
  userTableState : userTableReducer
});
