import { combineReducers } from 'redux';
import { pageReducer } from './Components/Sidebar/SidebarReducer';
import { kickFormReducer } from './Components/KickForm/KickFormReducers';

export default combineReducers({
  pageReducer,
  kickFormReducer
});
