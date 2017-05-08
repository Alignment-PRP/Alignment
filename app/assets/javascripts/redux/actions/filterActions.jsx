/**
 * Contains action creators for filtering requirements.
 * @module redux/actions/filter
 */

import {
    UPDATE_FILTER_REQUIREMENT_LIST,
    ADD_TO_FILTER,
    REMOVE_FROM_FILTER,
    ADD_TO_SUB_FILTER,
    REMOVE_FROM_SUB_FILTER
} from './../types';

/**
 * Filters the input with the filter, `comp`, and puts the result in the property `output`.
 * @param {String} comp - Filter component name.
 * @param {String} output - Output name.
 * @param {Object.<Requirement>} unFiltered - List with requirements.
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

/**
 * Adds a new value to `filter`, in `comp`.
 * @param {String} comp
 * @param {String} filter
 * @param {String} value
 * @returns {{type, comp: *, filter: *, value: *}}
 */
export function addToFilter(comp, filter, value) {
    return {
        type: ADD_TO_FILTER,
        comp: comp,
        filter: filter,
        value: value
    }
}

/**
 * Removes a value from `filter` in `comp`.
 * @param {String} comp
 * @param {String} filter
 * @param {String} value
 * @returns {{type, comp: *, filter: *, value: *}}
 */
export function removeFromFilter(comp, filter, value) {
    return {
        type: REMOVE_FROM_FILTER,
        comp: comp,
        filter: filter,
        value: value
    }
}

/**
 * Adds a child to a value in `filter`.
 * @param {String} comp
 * @param {String} filter
 * @param {String} child
 * @param {String} parent
 * @returns {{type, comp: *, filter: *, child: *, parent: *}}
 */
export function addToSubFilter(comp, filter, child, parent) {
    return {
        type: ADD_TO_SUB_FILTER,
        comp: comp,
        filter: filter,
        child: child,
        parent: parent
    }
}

/**
 * Removes a child from a value in `filter`.
 * @param {String} comp
 * @param {String} filter
 * @param {String} child
 * @param {String} parent
 * @returns {{type, comp: *, filter: *, child: *, parent: *}}
 */
export function removeFromSubFilter(comp, filter, child, parent) {
    return {
        type: REMOVE_FROM_SUB_FILTER,
        comp: comp,
        filter: filter,
        child: child,
        parent: parent
    }
}
