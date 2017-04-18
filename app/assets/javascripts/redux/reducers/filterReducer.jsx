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

const filterReducer = (state = {
    requirements: [],
    filterRequirementList: [],
    filter: []
}, action) => {
    switch (action.type) {
        case GET_ALL_REQUIREMENTS:
            return {
                ...state,
                requirements: action.payload,
            };
        case ADD_FILTER_COMPONENT:
            return {
                ...state,
                filterRequirementList: { ...state.filterRequirementList, [action.comp]: [] },
                filter: { ...state.filter, [action.comp]: [] }
            };
        case UPDATE_FILTER_REQUIREMENT_LIST:
            return {
                ...state,
                filterRequirementList: { ...state.filterRequirementList,
                    [action.comp]: state.requirements.filter(req => {
                        if (state.filter[action.comp][req.cName]) {
                            if (state.filter[action.comp][req.cName].length !== 0) {
                                if (state.filter[action.comp][req.cName].indexOf(req.scName) !== -1 ) {
                                    return true;
                                }
                                return false;
                            }
                            return true;
                        }
                    })
                }
            };
        case UPDATE_FILTER:
            return {
                ...state,
                filter: action.payload
            };
        case ADD_TO_FILTER:
            return {
                ...state,
                filter: { ...state.filter, [action.comp]: { ...state.filter[action.comp], [action.category]: []}}
            };
        case REMOVE_FROM_FILTER:
            delete state.filter[action.comp][action.category];
            return {
                ...state
            };
        case ADD_TO_SUB_FILTER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.comp]: {
                        ...state.filter[action.comp],
                        [action.parent]: state.filter[action.comp][action.parent].concat([action.sub])
                    }
                }
            };
        case REMOVE_FROM_SUB_FILTER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.comp]: {
                        ...state.filter[action.comp],
                        [action.parent]: state.filter[action.comp][action.parent].filter(e => e !== action.sub)
                    }
                }
            };
        default:
            return state
    }
};

export default filterReducer;