import { DIALOG_OPEN, DIALOG_CHANGE_ACTION, POST_ADD_REQUIREMENT, POST_UPDATE_REQUIREMENT } from './../types';

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
    projectEdit: {...init},
    projectEditAndAdd: {...init},
    projectReqUpdate: {...init},
    requirementDelete: {...init},
    requirementNew: {...init},
    requirementEdit: {...init},
    reqInfoDialog: {...init},
    proReqInfoDialog: {...init},
    requirementInfoDialog: {...init},
    userNew: {...init},
    userUpdate: {...init},
    userDelete: {...init},
    classUpdate: {...init},
    classDelete: {...init},
}, action) => {
    switch (action.type) {
        case POST_UPDATE_REQUIREMENT.RECEIVED:
        case POST_ADD_REQUIREMENT.RECEIVED:
            return {
                ...state,
                requirementNew: {
                    ...state.requirementNew,
                    isOpen: false
                },
                requirementEdit: {
                    ...state.requirementEdit,
                    isOpen: false
                }
            };

        case DIALOG_OPEN:
            return updateField(state, action.dialog, 'isOpen', action.isOpen);
        case DIALOG_CHANGE_ACTION:
            return updateField(state, action.dialog, 'action', action.action);
        default:
            return state;
    }
};

export default dialogReducer;
