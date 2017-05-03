import { POST_REGISTER, POST_LOGIN, GET_LOGOUT, GET_LOGIN_CHECK, AUTH_CLEAR, LOGIN_CLEAR, REGISTER_CLEAR } from './../types';

const init = {
    sent: false,
    received: false,
    error: false
};

const update = (state, prop, child, value) => {
    return {
        ...state,
        [prop]: {
            ...state[prop],
            [child]: value
        }
    }
};

const authReducer = (state = {
    authorized: {...init},
    register: {...init},
    login: {...init},
    logout: {...init}
}, action) => {
    switch (action.type) {
        case GET_LOGIN_CHECK.SENT:
            return update(state, 'authorized', 'sent', true);
        case GET_LOGIN_CHECK.RECEIVED:
            return update(state, 'authorized', 'received', true);
        case GET_LOGIN_CHECK.ERROR:
            return update(state, 'authorized', 'error', true);
        case GET_LOGOUT.SENT:
            return update(state, 'logout', 'sent', true);
        case GET_LOGOUT.RECEIVED:
            return update(state, 'logout', 'received', true);
        case GET_LOGOUT.ERROR:
            return update(state, 'logout', 'error', true);
        case POST_LOGIN.SENT:
            return update(state, 'login', 'sent', true);
        case POST_LOGIN.RECEIVED:
            return update(state, 'login', 'received', true);
        case POST_LOGIN.ERROR:
            return update(state, 'login', 'error', true);
        case POST_REGISTER.SENT:
            return update(state, 'register', 'sent', true);
        case POST_REGISTER.RECEIVED:
            return update(state, 'register', 'received', true);
        case POST_REGISTER.ERROR:
            return update(state, 'register', 'error', true);
        case AUTH_CLEAR:
            return {
                authorized: {...init},
                register: {...init},
                login: {...init},
                logout: {...init}
            };
        case LOGIN_CLEAR:
            return {
                ...state,
                login: {...init}
            };
        case REGISTER_CLEAR:
            return {
                ...state,
                register: {...init}
            };
        default:
            return state;
    }
};

export default authReducer;