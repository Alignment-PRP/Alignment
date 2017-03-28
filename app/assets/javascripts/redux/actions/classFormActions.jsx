import {CHANGE_CLASS_FORM_MODE, CLASS_CLICKED, FILL_CLASS_FORM, SNACKBAR} from './../types.jsx';

export function changeClassFormMode(mode) {
    return {
        type: CHANGE_CLASS_FORM_MODE,
        payload: mode
    }
}

export function classClicked(uclass) {
    return {
        type: CLASS_CLICKED,
        payload: uclass
    }
}

export function fillClassForm(data) {
    return {
        type: FILL_CLASS_FORM,
        payload: data,
    }
}

export function snackBar(bool, text) {
    return {
        type: SNACKBAR,
        payload: {open: bool, text: text},
    }
}
