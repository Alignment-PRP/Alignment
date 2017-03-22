
export function changeUserFormMode(mode) {
    return {
        type: 'CHANGE_USER_FORM_MODE',
        payload: mode
    }
}

export function userClicked(index) {
    return {
        type: 'USER_CLICKED',
        payload: index
    }
}
