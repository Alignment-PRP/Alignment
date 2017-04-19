import { SNACKBAR } from './../types';

/**
 * @param {boolean} bool
 * @param {string} text
 * @returns {{type, payload: {open: *, text: *}}}
 */
export function snackBar(bool, text) {
    return {
        type: SNACKBAR,
        isOpen: bool,
        text: text
    }
}