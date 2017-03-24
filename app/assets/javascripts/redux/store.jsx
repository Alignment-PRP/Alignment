import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer.jsx";
import requirementReducer from "./reducers/requirementReducer.jsx";
import projectReducer from "./reducers/projectReducer.jsx";
import sideMenuReducer from "./reducers/sideMenuReducer.jsx";

//This combine all the reducers into one.
//The second argument of combineReducer can be used to to set initial global state.
//The third argument applies middleware. This handles the data after it get dispatched from actions and before it gets to the reducers.
// This application uses "logger" for debugging purposes in browser and "thunk" to handle the asynchronous calls in Actions.

export default createStore(
    combineReducers({ userReducer, requirementReducer, projectReducer, sideMenuReducer }), {}, applyMiddleware(logger(), thunk)
);