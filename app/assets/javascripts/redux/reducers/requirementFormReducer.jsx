import { STEPPER_INDEX, UPDATE_REQUIRED_VALUES, UPDATE_OPTIONAL_VALUES, CLEAR_VALUES,
    REQUIREMENT_RECEIVED, ADD_REQUIREMENT
} from './../types';

const requirementFormReducer = (state = {
    stepperIndex: 0,
    requiredValues: {},
    optionalValues: {},
    sent: false,
    received: false
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
                optionalValues: {},
                sent: false,
                received: false,
                stepperIndex: 0
            };
        case ADD_REQUIREMENT:
            return {
                ...state,
                sent: true
            };
        case REQUIREMENT_RECEIVED:
            return {
                ...state,
                received: true
            };
        default:
            return state;
    }
};

export default requirementFormReducer;
