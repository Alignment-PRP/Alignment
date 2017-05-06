import { LOGIN_PAGE_CHANGE_COMPONENT, LOGIN_FAILED, REGISTER_FAILED, POST_REGISTER } from './../types';

const loginPageReducer = (state = {
    register: false
}, action) => {
    switch (action.type) {
        case POST_REGISTER.RECEIVED:
            return {
                ...state,
                register: false
            };
        case LOGIN_PAGE_CHANGE_COMPONENT:
            return {
                ...state,
                register: action.register
            };
        default:
            return state;
    }
};

export default loginPageReducer;