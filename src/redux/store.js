import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import userIdReducer from './userIdSlice';

export default configureStore({
    reducer: {
        info: userIdReducer
    },
})

