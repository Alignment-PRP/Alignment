import axios from 'axios';
import * as URLS from './../../config';
import {
    UPDATE_FILTER_REQUIREMENT_LIST,
    UPDATE_FILTER,
    ADD_TO_FILTER,
    REMOVE_FROM_FILTER,
    ADD_TO_SUB_FILTER,
    REMOVE_FROM_SUB_FILTER,
    ADD_FILTER_COMPONENT,
    GET_ALL_REQUIREMENTS
} from './../types';

export function addFilterComponent(comp) {
    return {
        type: ADD_FILTER_COMPONENT,
        comp: comp
    }
}

export function updateFilterRequirementList(comp) {
    return {
        type: UPDATE_FILTER_REQUIREMENT_LIST,
        comp: comp
    }
}

export function updateFilter(newFilter) {
    return {
        type: UPDATE_FILTER,
        payload: newFilter
    }
}

export function addToFilter(comp, category) {
    return {
        type: ADD_TO_FILTER,
        comp: comp,
        category: category
    }
}

export function removeFromFilter(comp, category) {
    return {
        type: REMOVE_FROM_FILTER,
        comp: comp,
        category: category
    }
}

export function addToSubFilter(comp, sub, parent) {
    return {
        type: ADD_TO_SUB_FILTER,
        comp: comp,
        sub: sub,
        parent: parent
    }
}

export function removeFromSubFilter(comp, sub, parent) {
    return {
        type: REMOVE_FROM_SUB_FILTER,
        comp: comp,
        sub: sub,
        parent: parent
    }
}

export function getAllRequirements() {
    return dispatch => {
        axios.get(URLS.REQUIREMENTS_GET)
            .then( response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getAllRequirementsAsync(data))
            });
    }
}

function getAllRequirementsAsync(data) {
    return {
        type: GET_ALL_REQUIREMENTS,
        payload: data
    }
}
