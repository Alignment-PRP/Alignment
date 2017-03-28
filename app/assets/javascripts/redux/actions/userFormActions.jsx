import axios from 'axios';
import {
    CHANGE_USER_FORM_MODE,
    USER_CLICKED,
    FILL_FORM,
    SNACKBAR,
    POST_USER_NEW,
    POST_USER_UPDATE,
    POST_USER_DELETE,
} from './../types.jsx';
import {
    USER_POST_NEW,
    USER_POST_UPDATE,
    USER_POST_DELETE,
} from './../../config.jsx';
import {
    getUsersWithClass,
} from './userActions.jsx';

export function changeUserFormMode(mode) {
    return {
        type: CHANGE_USER_FORM_MODE,
        payload: mode
    }
}

export function userClicked(user) {
    return {
        type: USER_CLICKED,
        payload: user
    }
}

export function fillForm(data) {
    return {
        type: FILL_FORM,
        payload: data,
    }
}

export function snackBar(bool, text) {
    return {
        type: SNACKBAR,
        payload: {open: bool, text: text},
    }
}

export function postUserNew(data){
    return dispatch => {
        axios.post(USER_POST_NEW, data)
            .then(function (response) {
                dispatch(getUsersWithClass());
                dispatch(changeUserFormMode("EMPTY"));
                dispatch(snackBar(true, "Bruker laget!"));
            })
            .catch(function (error) {
                dispatch(snackBar(true, "Noe gikk galt.."));
                console.log(error);
            });
        dispatch(postUserNewAsync())
    }
}

function postUserNewAsync() {
    return {
        type: POST_USER_NEW,
    }
}

export function postUserUpdate(data){
    return dispatch => {
        axios.post(USER_POST_UPDATE, data)
            .then(function (response) {
                dispatch(getUsersWithClass());
                dispatch(changeUserFormMode("EMPTY"));
                dispatch(snackBar(true, "Bruker oppdatert!"));
            })
            .catch(function (error) {
                dispatch(snackBar(true, "Noe gikk galt.."));
                console.log(error);
            });
        dispatch(postUserUpdateAsync())
    }
}

function postUserUpdateAsync() {
    return {
        type: POST_USER_UPDATE,
    }
}

export function postUserDelete(data){
    return dispatch => {
        axios.post(USER_POST_DELETE, data)
            .then(function (response) {
                dispatch(getUsersWithClass());
                dispatch(changeUserFormMode("EMPTY"));
                dispatch(snackBar(true, "Bruker slettet!"));
            })
            .catch(function (error) {
                dispatch(snackBar(true, "Noe gikk galt.."));
                console.log(error);
            });
        dispatch(postUserDeleteAsync())
    }
}

function postUserDeleteAsync() {
    return {
        type: POST_USER_DELETE,
    }
}
