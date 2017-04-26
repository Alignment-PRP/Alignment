import axios from 'axios';
import { push } from 'react-router-redux';
import { LOGGED_IN } from './../types';
import { LOGIN_POST, LOGIN_CHECK_GET, LOGOUT_GET, REGISTER_POST } from './../../config';
import { registerOpen, loginFailed, registerFailed } from './loginPageActions';
import { snackBar } from './snackBarActions';

export function register(user) {
    return dispatch => {
        axios.post(REGISTER_POST, user)
            .then(response => {
                dispatch(registerOpen(false));
                dispatch(registerFailed(false));
                dispatch(snackBar(true, 'Bruker registrert!'));
            })
            .catch(error => {
                dispatch(registerFailed(true))
            })
    }
}

export function login(user) {
    return dispatch => {
        axios.post(LOGIN_POST, user)
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
        axios.get(LOGOUT_GET)
            .then(response => {
                dispatch(checkLogin());
            })
            .catch(error => {

            })
    }
}

export function checkLogin() {
    return dispatch => {
        axios.get(LOGIN_CHECK_GET)
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
