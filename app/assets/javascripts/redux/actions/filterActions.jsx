/**
 * Contains action creators for filtering requirements.
 * @module redux/actions/filter
 */

import {
    UPDATE_FILTER_REQUIREMENT_LIST,
    UPDATE_FILTER,
    ADD_TO_FILTER,
    REMOVE_FROM_FILTER,
    ADD_TO_SUB_FILTER,
    REMOVE_FROM_SUB_FILTER,
    ADD_FILTER,
    ADD_FILTERED
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

/**
 *
 * @param {String} comp
 * @param {Object.<Requirement>} unFiltered
 * @returns {{type, comp: *, unFiltered: *}}
 */
export function updateFilterRequirementList(comp, output, unFiltered) {
    return {
        type: UPDATE_FILTER_REQUIREMENT_LIST,
        comp: comp,
        output: output,
        unFiltered: unFiltered
    }
}

export function addToFilter(comp, filter, value) {
    return {
        type: ADD_TO_FILTER,
        comp: comp,
        filter: filter,
        value: value
    }
}

export function removeFromFilter(comp, filter, value) {
    return {
        type: REMOVE_FROM_FILTER,
        comp: comp,
        filter: filter,
        value: value
    }
}

export function addToSubFilter(comp, filter, child, parent) {
    return {
        type: ADD_TO_SUB_FILTER,
        comp: comp,
        filter: filter,
        child: child,
        parent: parent
    }
}

export function removeFromSubFilter(comp, filter, child, parent) {
    return {
        type: REMOVE_FROM_SUB_FILTER,
        comp: comp,
        filter: filter,
        child: child,
        parent: parent
    }
}
