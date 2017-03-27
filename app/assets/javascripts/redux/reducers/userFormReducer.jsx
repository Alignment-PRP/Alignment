import {CHANGE_USER_FORM_MODE, USER_CLICKED, FILL_FORM, SNACKBAR} from './../types.jsx';

const userFormReducer = (state = {
    mode: "EMPTY",
    user: null,
    data: [],
    snack: {open: false, text: ""},
}, action) => {
    switch (action.type) {
        case CHANGE_USER_FORM_MODE:
            state = {
                mode: action.payload,
                user: state.user,
                data: state.data,
                snack: state.snack,
            };
            break;
        case USER_CLICKED:
            state = {
                mode: state.mode,
                user: action.payload,
                data: state.data,
                snack: state.snack,
            };
            break;
        case FILL_FORM:
            state = {
                mode: state.mode,
                user: state.user,
                data: action.payload,
                snack: state.snack,
            };
            break;
        case SNACKBAR:
            state = {
                mode: state.mode,
                user: state.user,
                data: state.data,
                snack: action.payload,
            };
            break;
    }
    return state;
};

export default userFormReducer;