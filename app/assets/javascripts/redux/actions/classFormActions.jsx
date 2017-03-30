import axios from 'axios';
import {
    CHANGE_CLASS_FORM_MODE,
    CLASS_CLICKED,
    FILL_CLASS_FORM,
    SNACKBAR,
    POST_CLASS_NEW,
    POST_CLASS_UPDATE,
    POST_CLASS_DELETE,
} from './../types.jsx';
import {
    USERCLASS_POST_NEW,
    USERCLASS_POST_UPDATE,
    USERCLASS_POST_DELETE
} from './../../config.jsx';
import {
    getUsersWithClass,
    getUserClasses
} from './userActions.jsx';

/**
 * Contains action creators for {@link ClassForm}
 * @module redux/actions/classForm
 */

/**
 * @param {string} mode
 * @returns {{type, payload: *}}
 */
export function changeClassFormMode(mode) {
    return {
        type: CHANGE_CLASS_FORM_MODE,
        payload: mode
    }
}

/**
 * @param {Object} uclass
 * @returns {{type, payload: *}}
 */
export function classClicked(uclass) {
    return {
        type: CLASS_CLICKED,
        payload: uclass
    }
}

/**
 * @param {json} data
 * @returns {{type, payload: *}}
 */
export function fillClassForm(data) {
    return {
        type: FILL_CLASS_FORM,
        payload: data,
    }
}

/**
 * @param {boolean} bool
 * @param {string} text
 * @returns {{type, payload: {open: *, text: *}}}
 */
export function snackBar(bool, text) {
    return {
        type: SNACKBAR,
        payload: {open: bool, text: text},
    }
}

/**
 * @param {json} data
 * @returns {function(*)}
 */
export function postClassNew(data){
    return dispatch => {
        axios.post(USERCLASS_POST_NEW, data)
            .then(function (response) {
                dispatch(getUserClasses());
                dispatch(changeClassFormMode("EMPTY"));
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
 * @param {json} data
 * @returns {function(*)}
 */
export function postClassUpdate(data){
    return dispatch => {
        axios.post(USERCLASS_POST_UPDATE, data)
            .then(function (response) {
                dispatch(getUserClasses());
                dispatch(getUsersWithClass());
                dispatch(changeClassFormMode("EMPTY"));
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
 * @param {json} data
 * @returns {function(*)}
 */
export function postClassDelete(data){
    return dispatch => {
        axios.post(USERCLASS_POST_DELETE, data)
            .then(function (response) {
                dispatch(getUserClasses());
                dispatch(getUsersWithClass());
                dispatch(changeClassFormMode("EMPTY"));
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
