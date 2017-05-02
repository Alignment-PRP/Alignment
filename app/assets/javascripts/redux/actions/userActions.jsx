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
 * @returns Data for the connected user.
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

function getUserDataAsync(user) {
    return {
        type: GET_USER_DATA,
        payload: user
    }
}

/**
 * Fetches all userdata.
 * @returns {json} List with all users.
 */
export function getUsers() {
    return dispatch => {
        axios.get(URLS.USERS_GET)
            .then( response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getUsersAsync(data))
            });
    }

}

function getUsersAsync(users) {
    return {
        type: GET_USERS,
        payload: users
    }
}

/**
 * Fetches all userdata with related userclass.
 * @returns {json} List with all userdata with userclass.
 */
export function getUsersWithClass() {
    return dispatch => {
        axios.get(URLS.USERS_GET_WITH_CLASS)
            .then( response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getUsersWithClassAsync(data))
            });
    }

}

function getUsersWithClassAsync(users) {
    return {
        type: GET_USERS_WITH_CLASS,
        payload: users
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
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getUserClassesAsync(data))
            });
    }

}

function getUserClassesAsync(userClasses) {
    return {
        type: GET_USERCLASSES,
        payload: userClasses
    }
}
