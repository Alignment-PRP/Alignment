import axios from 'axios';
import * as URLS from './../../config';
import {
    UPDATE_FILTER_REQUIREMENT_LIST,
    UPDATE_FILTER,
    ADD_TO_FILTER,
    REMOVE_FROM_FILTER,
    ADD_TO_SUB_FILTER,
    REMOVE_FROM_SUB_FILTER,
    ADD_FILTER,
    ADD_FILTERED,
    GET_ALL_REQUIREMENTS
} from './../types';

export function addFilter(filter) {
    return {
        type: ADD_FILTER,
        filter: filter
    }
}

export function addFiltered(comp) {
    return {
        type: ADD_FILTERED,
        comp: comp
    }
}

export function updateFilterRequirementList(filter, comp, unFiltered) {
    return {
        type: UPDATE_FILTER_REQUIREMENT_LIST,
        filter: filter,
        comp: comp,
        unFiltered: unFiltered
    }
}

export function updateFilter(newFilter) {
    return {
        type: UPDATE_FILTER,
        payload: newFilter
    }
}

export function addToFilter(filter, category) {
    return {
        type: ADD_TO_FILTER,
        filter: filter,
        category: category
    }
}

export function removeFromFilter(filter, category) {
    return {
        type: REMOVE_FROM_FILTER,
        filter: filter,
        category: category
    }
}

export function addToSubFilter(filter, sub, parent) {
    return {
        type: ADD_TO_SUB_FILTER,
        filter: filter,
        sub: sub,
        parent: parent
    }
}

export function removeFromSubFilter(filter, sub, parent) {
    return {
        type: REMOVE_FROM_SUB_FILTER,
        filter: filter,
        sub: sub,
        parent: parent
    }
}
