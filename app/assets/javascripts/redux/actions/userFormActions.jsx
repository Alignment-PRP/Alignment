import axios from 'axios';
import { FILL_FORM, POST_USER_NEW, POST_USER_UPDATE, POST_USER_DELETE } from './../types';
import { USER_POST_NEW, USER_POST_UPDATE, USER_POST_DELETE } from './../../config';
import { getUserData, getUsersWithClass } from './userActions';
import { snackBar } from './snackBarActions';

/**
 * Contains action creators for {@link UserForm}
 * @module redux/actions/userForm
 */


/**
 * @param {User} data
 * @returns {{type, payload: *}}
 */
export function fillForm(user) {
    return {
        type: FILL_FORM,
        payload: user,
    }
}

/**
 * @param {User} data
 * @param {User} data.pass
 * @returns {function(*)}
 */
export function postUserNew(user){
    return dispatch => {
        axios.post(USER_POST_NEW, user)
            .then(function (response) {
                dispatch(getUsersWithClass());
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

/**
 * @param {User} data
 * @param {string} data.oldUSERNAME
 * @returns {function(*)}
 */
export function postUserUpdate(user){
    return dispatch => {
        axios.post(USER_POST_UPDATE, user)
            .then(function (response) {
                dispatch(getUsersWithClass());
                dispatch(getUserData());
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

/**
 * @param {User} data
 * @returns {function(*)}
 */
export function postUserDelete(user){
    return dispatch => {
        axios.post(USER_POST_DELETE, user)
            .then(function (response) {
                dispatch(getUsersWithClass());
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
