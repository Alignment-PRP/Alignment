import {
    SNACKBAR,
    POST_UPDATE_REQUIREMENT,
    POST_ADD_REQUIREMENT,
    INSERT_HAS_ACCESS,
    REMOVE_HAS_ACCESS,
    POST_REQUIREMENT_TO_PROJECT,
    DELETE_REQUIREMENT_TO_PROJECT
} from './../types';

const snackBarReducer = (state = {
    isOpen: false,
    text: ''
}, action) => {
    switch (action.type) {
        case DELETE_REQUIREMENT_TO_PROJECT.RECEIVED:
            return {
                isOpen: true,
                text: "Krav slettet fra prosjekt!"
            };
        case DELETE_REQUIREMENT_TO_PROJECT.ERROR:
            return {
                isOpen: true,
                text: "Ingen tilgang."
            };
        case POST_REQUIREMENT_TO_PROJECT.RECEIVED:
            return {
                isOpen: true,
                text: "Krav lagt til!"
            };
        case POST_REQUIREMENT_TO_PROJECT.ERROR:
            return {
                isOpen: true,
                text: "Ingen tilgang."
            };
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
        case INSERT_HAS_ACCESS.RECEIVED:
            return {
                isOpen: true,
                text: action.response.data
            };
        case INSERT_HAS_ACCESS.ERROR:
            return {
                isOpen: true,
                text: action.response.data
            };
        case REMOVE_HAS_ACCESS.RECEIVED:
            return {
                isOpen: true,
                text: action.response.data
            };
        case REMOVE_HAS_ACCESS.ERROR:
            return {
                isOpen: true,
                text: action.response.data
            };
        default:
            return state
    }
};

export default snackBarReducer;