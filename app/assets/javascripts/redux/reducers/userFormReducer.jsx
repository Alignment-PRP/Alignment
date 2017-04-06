import {CHANGE_USER_FORM_MODE, USER_CLICKED, FILL_FORM, SNACKBAR} from './../types.jsx';

const userFormReducer = (state = {
    mode: "EMPTY",
    user: null,
    data: []
}, action) => {
    switch (action.type) {
        case CHANGE_USER_FORM_MODE:
            state = {
                mode: action.payload,
                user: state.user,
                data: state.data
            };
            break;
        case USER_CLICKED:
            state = {
                mode: state.mode,
                user: action.payload,
                data: state.data
            };
            break;
        case FILL_FORM:
            state = {
                mode: state.mode,
                user: state.user,
                data: action.payload
            };
            break;
    }
    return state;
};

export default userFormReducer;