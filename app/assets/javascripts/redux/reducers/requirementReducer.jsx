import {GET_ALL_REQUIREMENTS,
        GET_ALL_CATEGORY_NAMES,
        UPDATE_FILTER_REQUIREMENT_LIST,
        UPDATE_FILTER,
        UPDATE_REQUIREMENT,
        DELETE_REQUIREMENT,
        ADD_TO_FILTER,
        REMOVE_FROM_FILTER
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
            return {
                ...state,
                filterRequirementList: state.requirements.filter(req => {
                    for (let cat of state.filter) if (cat === req.cName) return true;
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
                filter: state.filter.concat([action.payload])
            };
        case REMOVE_FROM_FILTER:
            return {
                ...state,
                filter: state.filter.filter(e => e !== action.payload)
            };
        case DELETE_REQUIREMENT:
        default:
            return state
    }
};

export default requirementReducer;