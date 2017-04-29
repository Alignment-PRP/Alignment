import { STRUCTURE_GET_ALL } from './../types';

const structureReducer = (state = {
    structures: null
}, action) => {
    switch (action.type) {
        case STRUCTURE_GET_ALL:
            return {
                ...state,
                structures: action.structures
            };
        default:
            return state;
    }
};

export default structureReducer;