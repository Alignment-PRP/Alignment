import {
    DIALOG_OPEN,
    DIALOG_CHANGE_ACTION
} from './../types.jsx';

const init = {
    isOpen: false,
    action: () => {}
};

const updateField = (state, dialog, field, data) => {
    let newState = {...state};
    newState[dialog][field] = data;
    return newState;
};

const dialogReducer = (state = {
    projectDelete: {...init},
    projectNew: {...init},
    requirementDelete: {...init}
}, action) => {
    switch (action.type) {
        case DIALOG_OPEN:
            return updateField(state, action.dialog, 'isOpen', action.isOpen);
        case DIALOG_CHANGE_ACTION:
            return updateField(state, action.dialog, 'action', action.action);
        default:
            return state;
    }
};

export default dialogReducer;