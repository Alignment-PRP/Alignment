import {CHANGE_USER_FORM_MODE, USER_CLICKED, FILL_FORM, SNACKBAR} from './../types.jsx';

export function changeUserFormMode(mode) {
    return {
        type: CHANGE_USER_FORM_MODE,
        payload: mode
    }
}

export function userClicked(user) {
    return {
        type: USER_CLICKED,
        payload: user
    }
}

export function fillForm(data) {
    return {
        type: FILL_FORM,
        payload: data,
    }
}

export function snackBar(bool, text) {
    return {
        type: SNACKBAR,
        payload: {open: bool, text: text},
    }
}
