import axios from 'axios';
import { SENT, RECEIVED, ERROR } from './../utility';
import * as URLS from './../../config';
import { GET_USER_DATA, GET_USERS, GET_USERS_WITH_CLASS, GET_USERCLASSES } from './../types';

/**
 * Contains action creators for fetching userdata from the server.
 * @module redux/actions/user
 * @see {@link redux/reducers/user}
 */

/**
 * Fetches userdata for the connected user.
 */
export function getUserData() {
    return dispatch => {
        axios.get(URLS.USER_GET)
            .then(response => {
                dispatch(RECEIVED(GET_USER_DATA, response));
            })
            .catch(error => {
                dispatch(ERROR(GET_USER_DATA, error));
            });
        dispatch(SENT(GET_USER_DATA));
    }
}

/**
 * Fetches all userdata.
 */
export function getUsers() {
    return dispatch => {
        axios.get(URLS.USERS_GET)
            .then( response => {
                dispatch(RECEIVED(GET_USERS, response));
            })
            .catch(error => {
                dispatch(ERROR(GET_USERS, error));
            });
        dispatch(SENT(GET_USERS));
    }

}

/**
 * Fetches all userdata with related userclass.
 */
export function getUsersWithClass() {
    return dispatch => {
        axios.get(URLS.USERS_GET_WITH_CLASS)
            .then( response => {
                dispatch(RECEIVED(GET_USERS_WITH_CLASS, response));
            })
            .catch(error => {
                dispatch(ERROR(GET_USERS_WITH_CLASS, error));
            });
        dispatch(SENT(GET_USERS_WITH_CLASS));
    }

}

/**
 * Fetches all userclasses.
 * @returns {json} List with userclass data.
 */
export function getUserClasses() {
    return dispatch => {
        axios.get(URLS.USER_GET_USERCLASSES)
            .then( response => {
                dispatch(RECEIVED(GET_USERCLASSES, response));
            })
            .catch(error => {
                dispatch(ERROR(GET_USERCLASSES, error));
            });
        dispatch(SENT(GET_USERCLASSES));
    }

}
