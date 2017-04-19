import {
    DIALOG_OPEN,
    DIALOG_CHANGE_ACTION
} from './../types';

export function dialogOpen(dialog, isOpen) {
    return {
        type: DIALOG_OPEN,
        dialog: dialog,
        isOpen: isOpen
    }
}

export function dialogChangeAction(dialog, action) {
    return {
        type: DIALOG_CHANGE_ACTION,
        dialog: dialog,
        action: action
    }
}
