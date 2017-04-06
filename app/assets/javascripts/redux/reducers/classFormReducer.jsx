import {
    CHANGE_CLASS_FORM_MODE,
    CLASS_CLICKED,
    FILL_CLASS_FORM,
    POST_CLASS_NEW,
    POST_CLASS_UPDATE,
    POST_CLASS_DELETE,
} from './../types.jsx';

const classFormReducer = (state = {
    mode: "EMPTY",
    uclass: null,
    data: []
}, action) => {
    switch (action.type) {
        case CHANGE_CLASS_FORM_MODE:
            state = {
                mode: action.payload,
                uclass: state.uclass,
                data: state.data
            };
            break;
        case CLASS_CLICKED:
            state = {
                mode: state.mode,
                uclass: action.payload,
                data: state.data
            };
            break;
        case FILL_CLASS_FORM:
            state = {
                mode: state.mode,
                uclass: state.uclass,
                data: action.payload
            };
            break;
        case POST_CLASS_NEW:
        case POST_CLASS_UPDATE:
        case POST_CLASS_DELETE:
            break;
    }
    return state;
};

export default classFormReducer;