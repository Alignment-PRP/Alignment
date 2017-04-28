import { STEPPER_INDEX } from './../types';

const requirementFormReducer = (state = {
    stepperIndex: 0,
    requiredValues: {},
    optionalValues: {}
}, action) => {
    switch (action.type) {
        case STEPPER_INDEX:
            return {
                ...state,
                stepperIndex: action.index
            };
        case UPDATE_REQUIRED_VALUES:
            return {
                ...state,
                requiredValues: action.requiredValues
            };
        case UPDATE_OPTIONAL_VALUES:
            return {
                ...state,
                optionalValues: action.optionalValues
            };
        case CLEAR_VALUES:
            return {
                ...state,
                requiredValues: {},
                optionalValues: {}
            };
        default:
            return state;
    }
};

export default requirementFormReducer;
