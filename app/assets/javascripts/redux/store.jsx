import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form'

import userReducer from "./reducers/userReducer.jsx";
import requirementReducer from "./reducers/requirementReducer.jsx";
import projectReducer from "./reducers/projectReducer.jsx";
import sideMenuReducer from "./reducers/sideMenuReducer.jsx";
import userFormReducer from './reducers/userFormReducer.jsx';
import adminTabReducer from './reducers/adminTabReducers.jsx';

const reducers = {
    userReducer,
    requirementReducer,
    projectReducer,
    sideMenuReducer,
    userFormReducer,
    adminTabReducer,
    form: formReducer,
};

//This combine all the reducers into one.
//The second argument of combineReducer can be used to to set initial global state.
//The third argument applies middleware. This handles the data after it get dispatched from actions and before it gets to the reducers.
// This application uses "logger" for debugging purposes in browser and "thunk" to handle the asynchronous calls in Actions.

export default createStore(
    combineReducers(reducers), {}, applyMiddleware(logger(), thunk)
);