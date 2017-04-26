import axios from 'axios';
import { push } from 'react-router-redux';
import { LOGGED_IN, LOGIN_FAILED } from './../types';
import { LOGIN_POST, LOGIN_CHECK, LOGOUT } from './../../config';

export function login(username, password) {
    return dispatch => {
        axios.post(LOGIN_POST, {username: username, password: password})
            .then(response => {
                dispatch(checkLogin());
                dispatch(loginFailed(false))
            })
            .catch(error => {
                dispatch(loginFailed(true))
            });
    }
}

export function logout() {
    return dispatch => {
        axios.get(LOGOUT)
            .then(response => {
                dispatch(checkLogin());
            })
            .catch(error => {

            })
    }
}

export function checkLogin() {
    return dispatch => {
        axios.get(LOGIN_CHECK)
            .then( response => {
                dispatch(getCheckLoginAsync(true));
            })
            .catch(error => {
                dispatch(push('/'));
                dispatch(getCheckLoginAsync(false));
            });

    }

}

function getCheckLoginAsync(state) {
    return {
        type: LOGGED_IN,
        state: state
    }
}

function loginFailed(state) {
    return {
        type: LOGIN_FAILED,
        state: state
    }
}