import {
    CHANGE_PROJECT_FORM_MODE,
    PROJECT_CLICKED,
    FILL_PROJECT_FORM,
    SNACKBAR,
} from './../types.jsx';

/**
 * Contains action creators for {@link ProjectForm}
 * @module redux/actions/projectForm
 */

/**
 * @param {boolean} mode
 * @returns {{type, payload: *}}
 */
export function changeProjectFormMode(mode) {
    return {
        type: CHANGE_PROJECT_FORM_MODE,
        payload: mode
    }
}

/**
 * @param {Project} project
 * @returns {{type, payload: *}}
 */
export function projectClicked(project) {
    return {
        type: PROJECT_CLICKED,
        payload: project
    }
}

/**
 * @param {Project} project
 * @returns {{type, payload: *}}
 */
export function fillProjectForm(project) {
    return {
        type: FILL_PROJECT_FORM,
        payload: project,
    }
}

/**
 * @param {boolean} bool
 * @param {string} text
 * @returns {{type, payload: {open: *, text: *}}}
 */
export function snackBar(bool, text) {
    return {
        type: SNACKBAR,
        payload: {open: bool, text: text},
    }
}