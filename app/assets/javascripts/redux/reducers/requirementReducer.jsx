import {
    ADD_REQUIREMENT,
    POST_UPDATE_REQUIREMENT,
    POST_PROJECT_REQUIREMENT_UPDATE,
    UPDATE_REQUIREMENT,
    UPDATE_REQUIREMENT_METADATA,
    DELETE_REQUIREMENT,
    GET_ALL_CATEGORY_NAMES,
    GET_ALL_REQUIREMENTS
} from './../types';

const requirementReducer = (state = {
    requirements: null,
    requirement: [],
    requirementMetadata: null,
    categoryNames: []
}, action) => {
    switch (action.type) {
        case GET_ALL_REQUIREMENTS:
            return {
                ...state,
                requirements: action.payload,
            };
        case UPDATE_REQUIREMENT:
            return {
                ...state,
                requirement: action.payload
            };
        case UPDATE_REQUIREMENT_METADATA:
            return {
                ...state,
                requirementMetadata: action.payload
            };
        case GET_ALL_CATEGORY_NAMES:
            return {
                ...state,
                categoryNames: action.payload
            };
        case ADD_REQUIREMENT:
        case POST_UPDATE_REQUIREMENT:
        case POST_PROJECT_REQUIREMENT_UPDATE:
        case DELETE_REQUIREMENT:
        default:
            return state
    }
};

export default requirementReducer;