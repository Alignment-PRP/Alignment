import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import math from "./reducers/mathReducer.jsx";
import user from "./reducers/userReducer.jsx";
import requirementReducer from "./reducers/requirementReducer.jsx";

export default createStore(
    combineReducers({ math, user, requirementReducer }), {}, applyMiddleware(logger(), thunk)
);