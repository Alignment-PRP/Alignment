import { FILL_CLASS_FORM } from './../types';

const classFormReducer = (state = {
    uClass: null
}, action) => {
    switch (action.type) {
        case FILL_CLASS_FORM:
            return {
                ...state,
                uClass: action.payload
            };
        default:
            return state;
    }
};

export default classFormReducer;