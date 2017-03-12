import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import requirementReducer from "./reducers/requirementReducer.jsx";
import projectReducer from "./reducers/projectReducer.jsx";

export default createStore(
    combineReducers({ requirementReducer, projectReducer }), {}, applyMiddleware(logger(), thunk)
);