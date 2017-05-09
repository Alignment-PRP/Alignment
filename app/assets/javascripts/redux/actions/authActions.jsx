import axios from 'axios';
import { push } from 'react-router-redux';
import { SENT, RECEIVED, ERROR } from './../utility';
import { POST_REGISTER, POST_LOGIN, GET_LOGOUT, GET_LOGIN_CHECK, AUTH_CLEAR, LOGIN_CLEAR, REGISTER_CLEAR } from './../types';
import { LOGIN_POST, LOGIN_CHECK_GET, LOGOUT_GET, REGISTER_POST } from './../../config';

export function register(user) {
    return dispatch => {
        axios.post(REGISTER_POST, user)
            .then(response => {
                dispatch(RECEIVED(POST_REGISTER, response));
            })
            .catch(error => {
                dispatch(ERROR(POST_REGISTER, error));
            });
        dispatch(SENT(POST_REGISTER));
    }
}

export function login(user) {
    return dispatch => {
        axios.post(LOGIN_POST, user)
            .then(response => {
                dispatch(RECEIVED(POST_LOGIN, response));
                dispatch(checkLogin());
            })
            .catch(error => {
                dispatch(ERROR(POST_LOGIN, error));
            });
        dispatch(SENT(POST_LOGIN));
    }
}

export function logout() {
    return dispatch => {
        axios.get(LOGOUT_GET)
            .then(response => {
                dispatch(RECEIVED(GET_LOGOUT, response));
                dispatch(checkLogin());
            })
            .catch(error => {
                dispatch(ERROR(GET_LOGOUT, error));
            });
        dispatch(authClear());
        dispatch(SENT(GET_LOGOUT));
    }
}

export function checkLogin() {
    return dispatch => {
        axios.get(LOGIN_CHECK_GET)
            .then( response => {
                dispatch(RECEIVED(GET_LOGIN_CHECK, response));
            })
            .catch(error => {
                dispatch(push('/'));
                dispatch(ERROR(GET_LOGIN_CHECK, error));
            });
        dispatch(SENT(GET_LOGIN_CHECK));
    }
}

export function authClear() {
    return {
        type: AUTH_CLEAR
    }
}

export function loginClear() {
    return {
        type: LOGIN_CLEAR
    }
}

export function registerClear() {
    return {
        type: REGISTER_CLEAR
    }
}
