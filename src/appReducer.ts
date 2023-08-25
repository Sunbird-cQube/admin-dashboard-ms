import { combineReducers } from 'redux';
import { userReducer as userPage } from './api/user/userReducer';

const appReducer = combineReducers({
    userPage
});

export default appReducer;