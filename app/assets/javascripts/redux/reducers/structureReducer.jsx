import { STRUCTURE_GET_ALL, STRUCTURE_GET_TYPES } from './../types';

const structureReducer = (state = {
    structures: null,
    types: null
}, action) => {
    switch (action.type) {
        case STRUCTURE_GET_ALL:
            return {
                ...state,
                structures: action.structures
            };
        case STRUCTURE_GET_TYPES:
            return {
                ...state,
                types: action.types
            };
        default:
            return state;
    }
};

export default structureReducer;