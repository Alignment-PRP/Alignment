import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import authReducer from './reducers/authReducer';
import classFormReducer from './reducers/classFormReducer';
import dialogReducer from './reducers/dialogReducer';
import filterReducer from './reducers/filterReducer';
import loginPageReducer from './reducers/loginPageReducer';
import popoverReducer from './reducers/popoverReducer';
import projectReducer from './reducers/projectReducer';
import requirementReducer from './reducers/requirementReducer';
import requirementFormReducer from './reducers/requirementFormReducer';
import snackBarReducer from './reducers/snackBarReducer';
import statisticsReducer from './reducers/statisticsReducer';
import structureReducer from './reducers/structureReducer';
import tableReducer from './reducers/tableReducer';
import userFormReducer from './reducers/userFormReducer';
import userReducer from './reducers/userReducer';

/**
 * Defines the reducer and creates the redux store.
 * @module redux/store
 */

/**
 * @const
 */
const reducers = {
    authReducer,
    classFormReducer,
    dialogReducer,
    filterReducer,
    loginPageReducer,
    popoverReducer,
    projectReducer,
    requirementReducer,
    requirementFormReducer,
    snackBarReducer,
    statisticsReducer,
    structureReducer,
    tableReducer,
    userFormReducer,
    userReducer,
    form: formReducer,
    routing: routerReducer,
};

/**
 * This combines all the reducers into one.
 * The second argument of combineReducer can be used to to set initial global state.
 * The third argument applies middleware. This handles the data after it get dispatched
 * from actions and before it gets to the reducers.
 * This application uses "logger" for debugging purposes in browser and "thunk"
 * to handle the asynchronous calls in Actions.
 * @const
 * @type {Store<S>}
 */
const store = createStore(
    combineReducers(reducers), {}, applyMiddleware(thunk, routerMiddleware(browserHistory), logger())
);

export default store;