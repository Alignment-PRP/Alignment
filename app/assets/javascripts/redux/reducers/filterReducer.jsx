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

const filterReducer = (state = {
    filterRequirementList: {},
    filters: {}
}, action) => {
    switch (action.type) {
        case ADD_FILTERED: {
            return {
                ...state,
                filterRequirementList: { ...state.filterRequirementList, [action.comp]: {} }
            }
        }
        case ADD_FILTER:
            return {
                ...state,
                filters: { ...state.filters, [action.filter]: {} }
            };
        case UPDATE_FILTER_REQUIREMENT_LIST:
            const unFiltered = action.unFiltered;
            const comp = action.comp;
            const filter = state.filters[action.filter];
            const list = {};
            Object.keys(unFiltered).filter(key => {
                const cName = unFiltered[key].cName;
                const scName = unFiltered[key].scName;
                if (filter[cName]) {
                    if (filter[cName].length !== 0) {
                        if (filter[cName].indexOf(scName) !== -1) {
                            return true
                        }
                        return false
                    }
                    return true
                }
            }).forEach(key => { list[key] = unFiltered[key] });
            return {
                ...state,
                filterRequirementList: {
                    ...state.filterRequirementList,
                    [comp]: list
                }
            };
        case UPDATE_FILTER:
            return {
                ...state,
                filters: action.payload
            };
        case ADD_TO_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.filter]: {
                        ...state.filters[action.filter],
                        [action.category]: []
                    }
                }
            };
        case REMOVE_FROM_FILTER:
            let newState = Object.assign({}, state);
            newState.filters = Object.assign({}, state.filters);
            newState.filters[action.filter] = Object.assign({}, state.filters[action.filter]);
            delete newState.filters[action.filter][action.category];
            return {
                ...newState
            };
        case ADD_TO_SUB_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.filter]: {
                        ...state.filters[action.filter],
                        [action.parent]: state.filters[action.filter][action.parent].concat([action.sub])
                    }
                }
            };
        case REMOVE_FROM_SUB_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.filter]: {
                        ...state.filters[action.filter],
                        [action.parent]: state.filters[action.filter][action.parent].filter(e => e !== action.sub)
                    }
                }
            };
        default:
            return state
    }
};

export default filterReducer;