import { LOGGED_IN } from './../types';

const authReducer = (state = {
    loggedIn: null
}, action) => {
    switch (action.type) {
        case LOGGED_IN:
            return {
                ...state,
                loggedIn: action.state
            };
        default:
            return state;
    }
};

export default authReducer;