import { STRUCTURE_GET_ALL, STRUCTURE_GET_TYPES } from './../types';

const structureReducer = (state = {
    structures: null,
    types: null
}, action) => {
    switch (action.type) {
        case STRUCTURE_GET_ALL.RECEIVED:
            return {
                ...state,
                structures: action.response.data
            };
        case STRUCTURE_GET_TYPES.RECEIVED:
            return {
                ...state,
                types: action.response.data
            };
        default:
            return state;
    }
};

export default structureReducer;