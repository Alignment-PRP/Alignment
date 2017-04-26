import { LOGIN_PAGE_CHANGE_COMPONENT, LOGIN_FAILED, REGISTER_FAILED } from './../types';

export function registerOpen(boolean) {
    return {
        type: LOGIN_PAGE_CHANGE_COMPONENT,
        register: boolean
    }
}

export function loginFailed(state) {
    return {
        type: LOGIN_FAILED,
        state: state
    }
}

export function registerFailed(state) {
    return {
        type: REGISTER_FAILED,
        state: state
    }
}
