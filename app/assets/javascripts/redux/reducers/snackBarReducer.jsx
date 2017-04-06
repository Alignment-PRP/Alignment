import {SNACKBAR} from './../types.jsx';

const snackBarReducer = (state = {
    isOpen: false,
    text: ''
}, action) => {
    switch (action.type) {
        case SNACKBAR:
            state = {
                isOpen: action.isOpen,
                text: action.text
            };
            break;
    }
    return state;
};

export default snackBarReducer;