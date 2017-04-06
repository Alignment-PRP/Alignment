import {
    CHANGE_CLASS_FORM_MODE,
    CLASS_CLICKED,
    FILL_CLASS_FORM,
} from './../types.jsx';

const classFormReducer = (state = {
    mode: "EMPTY",
    uclass: null,
    data: []
}, action) => {
    switch (action.type) {
        case CHANGE_CLASS_FORM_MODE:
            return {
                ...state,
                mode: action.payload
            };
        case CLASS_CLICKED:
            return {
                ...state,
                uclass: action.payload
            };
        case FILL_CLASS_FORM:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};

export default classFormReducer;