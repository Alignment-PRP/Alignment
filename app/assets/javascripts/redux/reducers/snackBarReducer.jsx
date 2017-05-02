import {SNACKBAR, POST_UPDATE_REQUIREMENT, POST_ADD_REQUIREMENT} from './../types';

const snackBarReducer = (state = {
    isOpen: false,
    text: ''
}, action) => {
    switch (action.type) {
        case POST_UPDATE_REQUIREMENT.RECEIVED:
            return {
                isOpen: true,
                text: action.response.data.name + ' er oppdatert!'
            };
        case POST_ADD_REQUIREMENT.RECEIVED:
            return {
                isOpen: true,
                text: action.response.data.name + ' lagt til!'
            };
        case SNACKBAR:
            return {
                isOpen: action.isOpen,
                text: action.text
            };
        default:
            return state
    }
};

export default snackBarReducer;