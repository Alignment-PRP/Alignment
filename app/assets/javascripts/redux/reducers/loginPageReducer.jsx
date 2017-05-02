import { LOGIN_PAGE_CHANGE_COMPONENT, LOGIN_FAILED, REGISTER_FAILED } from './../types';

const loginPageReducer = (state = {
    register: false,
    loginFailed: false,
    registerFailed: false
}, action) => {
    switch (action.type) {
        case LOGIN_PAGE_CHANGE_COMPONENT:
            return {
                ...state,
                register: action.register
            };
        case LOGIN_FAILED:
            return {
                ...state,
                loginFailed: action.state
            };
        case REGISTER_FAILED:
            return {
                ...state,
                registerFailed: action.state
            };
        default:
            return state;
    }
};

export default loginPageReducer;