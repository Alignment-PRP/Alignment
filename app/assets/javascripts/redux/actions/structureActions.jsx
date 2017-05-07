import axios from 'axios';
import { SENT, RECEIVED, ERROR } from './../utility';
import * as URLS from './../../config';
import { STRUCTURE_GET_ALL, STRUCTURE_GET_TYPES } from './../types';

export function getStructures() {
    return dispatch => {
        axios.get(URLS.STRUCTURE_GET_ALL)
            .then( response => {
                dispatch(RECEIVED(STRUCTURE_GET_ALL, response));
            })
            .catch(error => {
                dispatch(ERROR(STRUCTURE_GET_ALL, error));
            });
        dispatch(SENT(STRUCTURE_GET_ALL));
    }
}

export function getStructureTypes() {
    return dispatch => {
        axios.get(URLS.REQUIREMENT_GET_STUCTURE)
            .then( response => {
                dispatch(RECEIVED(STRUCTURE_GET_TYPES, response));
            })
            .catch(error => {
                dispatch(ERROR(STRUCTURE_GET_TYPES, error));
            });
        dispatch(SENT(STRUCTURE_GET_TYPES));
    }
}
