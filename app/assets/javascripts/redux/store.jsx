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

export default createStore(
    combineReducers(reducers), {}, applyMiddleware(logger(), thunk)
);