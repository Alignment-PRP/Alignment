import {
    UPDATE_FILTER_REQUIREMENT_LIST,
    ADD_TO_FILTER,
    REMOVE_FROM_FILTER,
    ADD_TO_SUB_FILTER,
    REMOVE_FROM_SUB_FILTER
} from './../types';

const filterReducer = (state = {
    filterRequirementList: {},
    filters: {}
}, action) => {
    switch (action.type) {
        case UPDATE_FILTER_REQUIREMENT_LIST: {
            const {unFiltered, comp, output} = action;
            const filter = state.filters[comp];
            const cat_filtered = filterOnCategory(filter, unFiltered);
            const struc_filtered = filterOnStructure(filter, cat_filtered);

            return {
                ...state,
                filterRequirementList: {
                    ...state.filterRequirementList,
                    [output]: struc_filtered
                }
            };
        }
        case ADD_TO_FILTER: {
            const {comp, filter, value} = action;
            const newFilters = {...state.filters, [comp]: {[filter]: {[value]: []}}};

            if (state.filters[comp]) {
                newFilters[comp] = {
                    ...state.filters[comp],
                    ...newFilters[comp]
                };

                if (state.filters[comp][filter]) {
                    newFilters[comp][filter] = {
                        ...state.filters[comp][filter],
                        ...newFilters[comp][filter]
                    }
                }
            }

            return {
                ...state,
                filters: newFilters
            };
        }
        case REMOVE_FROM_FILTER: {
            const { comp, filter, value} = action;
            let newState = Object.assign({}, state);
            newState.filters = Object.assign({}, state.filters);
            newState.filters[comp] = Object.assign({}, state.filters[comp]);
            newState.filters[comp][filter] = Object.assign({}, state.filters[comp][filter]);
            delete newState.filters[comp][filter][value];
            return {
                ...newState
            };
        }
        case ADD_TO_SUB_FILTER: {
            const {comp, filter, parent, child} = action;
            const newFilters = {...state.filters, [comp]: {[filter]: {[parent]: [child]}}};

            if (state.filters[comp]) {
                newFilters[comp] = {
                    ...state.filters[comp],
                    ...newFilters[comp]
                };

                if (state.filters[comp][filter]) {
                    newFilters[comp][filter] = {
                        ...state.filters[comp][filter],
                        ...newFilters[comp][filter]
                    };

                    if (state.filters[comp][filter][parent]) {
                        newFilters[comp][filter][parent] = [
                            ...state.filters[comp][filter][parent],
                            ...newFilters[comp][filter][parent]
                        ]
                    }
                }
            }

            return {
                ...state,
                filters: newFilters
            };
        }
        case REMOVE_FROM_SUB_FILTER: {
            const {comp, filter, parent, child} = action;
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [comp]: {
                        ...state.filters[comp],
                        [filter]: {
                            ...state.filters[comp][filter],
                            [parent]: state.filters[comp][filter][parent].filter(e => e !== child)
                        }
                    }
                }
            };
        }
        default:
            return state
    }
};

/**
 *
 * @param {Object} filter
 * @param {Object.<Requirement>} requirements
 * @returns {Object.<Requirement>}
 */
const filterOnCategory = (filter, requirements) => {
    if (!filter.category) return requirements;
    
    const filter_c = filter.category;
    if (Object.keys(filter_c).length > 0) {
        return Object.keys(requirements).filter(key => {
            const cName = requirements[key].cName;
            const scName = requirements[key].scName;
            if (filter && filter_c[cName]) {
                if (filter_c[cName].length !== 0) {
                    return filter_c[cName].indexOf(scName) !== -1;
                }
                return true;
            }
        }).reduce((prev, curr) => {
            prev[curr] = requirements[curr];
            return prev;
        }, {});
    }
    return requirements;
};

/**
 *
 * @param {Object} filter
 * @param {Object.<Requirement>} requirements
 * @return {Object.<Requirement>}
 */
const filterOnStructure = (filter, requirements) => {
    if (!filter.structure) return requirements;

    const filter_s = filter.structure;
    if (Object.keys(filter_s).length > 0) {
        return Object.keys(requirements).filter(key => {
            if (requirements[key].structures.length > 0) {
                const keys = Object.keys(filter_s);
                for (let i = 0; i < keys.length; i++) {
                    const struc = keys[i];
                    if (filter_s[struc].length > 0) {
                        if (!filterOnStrucMany(requirements[key].structures, filter_s, struc)) return false;
                    } else {
                        if (!filterOnStrucOne(requirements[key].structures, struc)) return false;
                    }
                }
                return true;
            }
            return false;
        }).reduce((acc, curr) => {
            acc[curr] = requirements[curr];
            return acc;
        }, {});
    }
    return requirements;
};

/**
 *
 * @param {Array.<Structure>} req_structures
 * @param {String} struc
 * @returns {boolean}
 */
const filterOnStrucOne = (req_structures, struc) => {
    for (let j = 0; j < req_structures.length; j++) {
        if (req_structures[j].type === struc) return true;
    }
    return false;
};

/**
 *
 * @param {Array.<Structure>} req_structures
 * @param {Object} filter_s
 * @param {String} struc
 * @returns {boolean}
 */
const filterOnStrucMany = (req_structures, filter_s, struc) => {
    return req_structures.filter(r_struc => {
        for (let i = 0; i < filter_s[struc].length; i++) {
            if (r_struc.content === filter_s[struc][i]) return true;
        }
        return false;
    }).length > 0;
};

export default filterReducer;