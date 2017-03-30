import axios from 'axios';
import * as URLS from './../../config.jsx';
import {GET_USER_DATA, GET_USERS, GET_USERS_WITH_CLASS, GET_USERCLASSES} from './../types.jsx';

/**
 * Contains action creators for fetching userdata from the server.
 * @module redux/actions/user
 * @see {@link redux/reducers/user}
 */

/**
 * Fetches userdata for the connected user.
 * @returns {json} Data for the connected user.
 */
export function getUserData() {
    return dispatch => {
        axios.get(URLS.USER_GET)
            .then(response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getUserDataAsync(data))
            });
    }
}

function getUserDataAsync(data) {
    return {
        type: GET_USER_DATA,
        payload: data
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

function getUsersAsync(data) {
    return {
        type: GET_USERS,
        payload: data
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

function getUsersWithClassAsync(data) {
    return {
        type: GET_USERS_WITH_CLASS,
        payload: data
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

function getUserClassesAsync(data) {
    return {
        type: GET_USERCLASSES,
        payload: data
    }
}
