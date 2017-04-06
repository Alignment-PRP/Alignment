import {GET_ALL_REQUIREMENTS,
        GET_ALL_CATEGORY_NAMES,
        UPDATE_FILTER_REQUIREMENT_LIST,
        UPDATE_FILTER,
        ADD_REQUIREMENT,
        POST_UPDATE_REQUIREMENT,
        UPDATE_REQUIREMENT,
        DELETE_REQUIREMENT,
        ADD_TO_FILTER,
        REMOVE_FROM_FILTER,
        ADD_TO_SUB_FILTER,
        REMOVE_FROM_SUB_FILTER
} from './../types.jsx';

const requirementReducer = (state = {
    requirements: [],
    requirement: [],
    filterRequirementList: [],
    filter: [],
    categoryNames: []
}, action) => {
    switch (action.type) {
        case GET_ALL_REQUIREMENTS:
            return {
                ...state,
                requirements: action.payload,
            };
        case GET_ALL_CATEGORY_NAMES:
            return {
                ...state,
                categoryNames: action.payload
            };
        case UPDATE_REQUIREMENT:
            return {
                ...state,
                requirement: action.payload
            };
        case UPDATE_FILTER_REQUIREMENT_LIST:
            console.log(state.filter);
            return {
                ...state,
                filterRequirementList: state.requirements.filter(req => {
                    if (state.filter[req.cName]) {
                        if (state.filter[req.cName].length !== 0) {
                            if (state.filter[req.cName].indexOf(req.scName) !== -1 ) {
                                return true;
                            }
                            return false;
                        }
                        return true;
                    }
                })
            };
        case UPDATE_FILTER:
            return {
                ...state,
                filter: action.payload
            };
        case ADD_TO_FILTER:
            return {
                ...state,
                filter: { ...state.filter, [action.payload]: []}
            };
        case REMOVE_FROM_FILTER:
            delete state.filter[action.payload];
            return {
                ...state
            };
        case ADD_TO_SUB_FILTER:
            return {
                ...state,
                filter: { ...state.filter, [action.parent]: state.filter[action.parent].concat([action.sub]) }
            };
        case REMOVE_FROM_SUB_FILTER:
            return {
                ...state,
                filter: { ...state.filter, [action.parent]: state.filter[action.parent].filter(e => e !== action.sub)}
            };
        case ADD_REQUIREMENT:
        case POST_UPDATE_REQUIREMENT:
        case DELETE_REQUIREMENT:
        default:
            return state
    }
};

export default requirementReducer;