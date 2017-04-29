import axios from 'axios';
import * as URLS from './../../config';
import { STRUCTURE_GET_ALL } from './../types';

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
