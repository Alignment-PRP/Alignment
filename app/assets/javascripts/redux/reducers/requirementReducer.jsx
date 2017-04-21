import {
    ADD_REQUIREMENT,
    POST_UPDATE_REQUIREMENT,
    UPDATE_REQUIREMENT,
    DELETE_REQUIREMENT,
    GET_ALL_CATEGORY_NAMES,
    GET_ALL_REQUIREMENTS
} from './../types';

const requirementReducer = (state = {
    requirements: null,
    requirement: [],
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
        case GET_ALL_CATEGORY_NAMES:
            return {
                ...state,
                categoryNames: action.payload
            };
        case ADD_REQUIREMENT:
        case POST_UPDATE_REQUIREMENT:
        case DELETE_REQUIREMENT:
        default:
            return state
    }
};

export default requirementReducer;