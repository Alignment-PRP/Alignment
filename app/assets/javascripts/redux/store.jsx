import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import userReducer from "./reducers/userReducer";
import requirementReducer from "./reducers/requirementReducer";
import projectReducer from "./reducers/projectReducer";
import sideMenuReducer from "./reducers/sideMenuReducer";
import statisticsReducer from "./reducers/statisticsReducer";
import userFormReducer from './reducers/userFormReducer';
import classFormReducer from './reducers/classFormReducer';
import tableReducer from './reducers/tableReducer';
import dialogReducer from './reducers/dialogReducer';
import snackBarReducer from './reducers/snackBarReducer';

/**
 * Defines the reducer and creates the redux store.
 * @module redux/store
 */

/**
 * @const
 */
const reducers = {
    userReducer,
    requirementReducer,
    projectReducer,
    sideMenuReducer,
    userFormReducer,
    classFormReducer,
    tableReducer,
    dialogReducer,
    statisticsReducer,
    snackBarReducer,
    form: formReducer,
    router: routerReducer,
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
    combineReducers(reducers), {}, applyMiddleware(logger(), thunk, routerMiddleware(browserHistory))
);

export default store;