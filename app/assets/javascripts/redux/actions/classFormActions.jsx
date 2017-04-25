import axios from 'axios';
import { FILL_CLASS_FORM, POST_CLASS_NEW, POST_CLASS_UPDATE, POST_CLASS_DELETE } from './../types';
import { USERCLASS_POST_NEW, USERCLASS_POST_UPDATE, USERCLASS_POST_DELETE } from './../../config';
import { getUsersWithClass, getUserClasses } from './userActions';
import { snackBar } from './snackBarActions';

/**
 * Contains action creators for {@link ClassForm}
 * @module redux/actions/classForm
 */

/**
 * @param {UserClass} uClass
 * @returns {{type, payload: *}}
 */
export function fillClassForm(uClass) {
    return {
        type: FILL_CLASS_FORM,
        payload: uClass,
    }
}

/**
 * @param {UserClass} uClass
 * @returns {function(*)}
 */
export function postClassNew(uClass){
    return dispatch => {
        axios.post(USERCLASS_POST_NEW, uClass)
            .then(function (response) {
                dispatch(getUserClasses());
                dispatch(snackBar(true, "Brukerklasse laget!"));
            })
            .catch(function (error) {
                dispatch(snackBar(true, "Noe gikk galt.."));
                console.log(error);
            });
        dispatch(postClassNewAsync())
    }
}

function postClassNewAsync() {
    return {
        type: POST_CLASS_NEW,
    }
}

/**
 * @param {UserClass} uClass
 * @param {string} data.oldNAME
 * @returns {function(*)}
 */
export function postClassUpdate(uClass){
    return dispatch => {
        axios.post(USERCLASS_POST_UPDATE, uClass)
            .then(function (response) {
                dispatch(getUserClasses());
                dispatch(getUsersWithClass());
                dispatch(snackBar(true, "Brukerklasse oppdatert!"));
            })
            .catch(function (error) {
                dispatch(snackBar(true, "Noe gikk galt.."));
                console.log(error);
            });
        dispatch(postClassUpdateAsync())
    }
}

function postClassUpdateAsync() {
    return {
        type: POST_CLASS_UPDATE,
    }
}

/**
 * @param {UserClass} uClass
 * @param {string} uClass.replacement
 * @returns {function(*)}
 */
export function postClassDelete(uClass){
    return dispatch => {
        axios.post(USERCLASS_POST_DELETE, uClass)
            .then(function (response) {
                dispatch(getUserClasses());
                dispatch(getUsersWithClass());
                dispatch(snackBar(true, "Brukerklasse slettet!"));
            })
            .catch(function (error) {
                dispatch(snackBar(true, "Noe gikk galt.."));
                console.log(error);
            });
        dispatch(postClassDeleteAsync())
    }
}

function postClassDeleteAsync() {
    return {
        type: POST_CLASS_DELETE,
    }
}
