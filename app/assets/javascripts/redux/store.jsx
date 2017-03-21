import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer.jsx";
import requirementReducer from "./reducers/requirementReducer.jsx";
import projectReducer from "./reducers/projectReducer.jsx";
import sideMenuReducer from "./reducers/sideMenuReducer.jsx";
import userFormReducer from './reducers/userFormReducer.jsx';

const reducers = {
    userReducer,
    requirementReducer,
    projectReducer,
    sideMenuReducer,
    userFormReducer
};

export default createStore(
    combineReducers(reducers), {}, applyMiddleware(logger(), thunk)
);