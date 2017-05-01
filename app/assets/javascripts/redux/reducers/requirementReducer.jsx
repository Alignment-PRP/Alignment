import {

    FORM_UPDATE_REQUIREMENT,
    FORM_UPDATE_REQUIREMENT_METADATA,
    GET_CATEGORY_NAMES,
    GET_REQUIREMENTS,
    POST_ADD_REQUIREMENT
} from './../types';

const requirementReducer = (state = {
    requirements: null,
    requirement: [],
    requirementMetadata: null,
    categoryNames: []
}, action) => {
    switch (action.type) {
        case POST_ADD_REQUIREMENT.RECEIVED:
            const req = action.response.data;
            return {
                ...state,
                requirements: {
                    ...state.requirements,
                    [req.ID]: req
                }
            };
        case GET_REQUIREMENTS.RECEIVED:
            return {
                ...state,
                requirements: action.response.data,
            };
        case FORM_UPDATE_REQUIREMENT:
            return {
                ...state,
                requirement: action.payload
            };
        case FORM_UPDATE_REQUIREMENT_METADATA:
            return {
                ...state,
                requirementMetadata: action.payload
            };
        case GET_CATEGORY_NAMES.RECEIVED:
            return {
                ...state,
                categoryNames: action.response.data
            };
        default:
            return state
    }
};

export default requirementReducer;