import axios from 'axios';
import * as URLS from './../../config';
import { STRUCTURE_GET_ALL, STRUCTURE_GET_TYPES } from './../types';

export function getStructures() {
    return dispatch => {
        axios.get(URLS.STRUCTURE_GET_ALL)
            .then( response => {
                dispatch(getStructuresAsync(response.data))
            });

    }

}

function getStructuresAsync(structures){
    return {
        type: STRUCTURE_GET_ALL,
        structures: structures
    }
}

export function getStructureTypes() {
    return dispatch => {
        axios.get(URLS.REQUIREMENT_GET_STUCTURE)
            .then( response => {
                dispatch(getStructureTypesAsync(response.data))
            });
    }
}
function getStructureTypesAsync(data) {
    return {
        type: STRUCTURE_GET_TYPES,
        types: data
    }
}
