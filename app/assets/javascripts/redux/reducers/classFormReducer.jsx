import {CHANGE_CLASS_FORM_MODE, CLASS_CLICKED, FILL_CLASS_FORM, SNACKBAR} from './../types.jsx';

const classFormReducer = (state = {
    mode: "EMPTY",
    uclass: null,
    data: [],
    snack: {open: false, text: ""},
}, action) => {
    switch (action.type) {
        case CHANGE_CLASS_FORM_MODE:
            state = {
                mode: action.payload,
                uclass: state.uclass,
                data: state.data,
                snack: state.snack,
            };
            break;
        case CLASS_CLICKED:
            state = {
                mode: state.mode,
                uclass: action.payload,
                data: state.data,
                snack: state.snack,
            };
            break;
        case FILL_CLASS_FORM:
            state = {
                mode: state.mode,
                uclass: state.uclass,
                data: action.payload,
                snack: state.snack,
            };
            break;
        case SNACKBAR:
            state = {
                mode: state.mode,
                uclass: state.uclass,
                data: state.data,
                snack: action.payload,
            };
            break;
    }
    return state;
};

export default classFormReducer;