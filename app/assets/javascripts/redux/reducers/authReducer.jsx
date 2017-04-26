import { LOGGED_IN, LOGIN_FAILED } from './../types';

const authReducer = (state = {
    loggedIn: null,
    loginFailed: false
}, action) => {
    switch (action.type) {
        case LOGGED_IN:
            return {
                ...state,
                loggedIn: action.state
            };
        case LOGIN_FAILED:
            return {
                ...state,
                loginFailed: action.state
            };
        default:
            return state;
    }
};

export default authReducer;