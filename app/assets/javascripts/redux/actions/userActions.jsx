import axios from 'axios';
import * as URLS from './../../config.jsx';
import {GET_USER_DATA, GET_USERS, GET_USERS_WITH_CLASS, GET_USERCLASSES} from './../types.jsx';

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
