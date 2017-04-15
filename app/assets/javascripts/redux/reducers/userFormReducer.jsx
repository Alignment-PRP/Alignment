import {CHANGE_USER_FORM_MODE, USER_CLICKED, FILL_FORM, SNACKBAR} from './../types';

const userFormReducer = (state = {
    mode: "EMPTY",
    user: null,
    data: []
}, action) => {
    switch (action.type) {
        case CHANGE_USER_FORM_MODE:
            return {
                ...state,
                mode: action.payload
            };
        case USER_CLICKED:
            return {
                ...state,
                user: action.payload
            };
        case FILL_FORM:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};

export default userFormReducer;