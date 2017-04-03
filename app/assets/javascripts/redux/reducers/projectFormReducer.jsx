import {CHANGE_PROJECT_FORM_MODE, PROJECT_CLICKED, FILL_PROJECT_FORM, SNACKBAR} from './../types.jsx';

const projectFormReducer = (state = {
    mode: true,
    project: {},
    snack: {open: false, text: ""},
}, action) => {
    switch (action.type) {
        case CHANGE_PROJECT_FORM_MODE:
            state = {
                mode: action.payload,
                project: state.project,
                snack: state.snack,
            };
            break;
        case PROJECT_CLICKED:
        case FILL_PROJECT_FORM:
            state = {
                mode: state.mode,
                project: action.payload,
                snack: state.snack,
            };
            break;
        case SNACKBAR:
            state = {
                mode: state.mode,
                project: state.project,
                snack: action.payload,
            };
            break;
    }
    return state;
};

export default projectFormReducer;