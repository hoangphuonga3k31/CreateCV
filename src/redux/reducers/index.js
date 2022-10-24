import { combineReducers } from 'redux';
import info from './userIdReducers'

const reducers = combineReducers({
    userId: info
});

export default (state, action) => reducers(state, action);