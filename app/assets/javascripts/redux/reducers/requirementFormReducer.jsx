import { STEPPER_INDEX, UPDATE_REQUIRED_VALUES, UPDATE_OPTIONAL_VALUES, CLEAR_VALUES,
    POST_ADD_REQUIREMENT, POST_UPDATE_REQUIREMENT
} from './../types';

const requirementFormReducer = (state = {
    stepperIndex: 0,
    requiredValues: {},
    optionalValues: {},
    sent: false,
    received: false,
    error: false
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
        case POST_UPDATE_REQUIREMENT.RECEIVED:
        case POST_ADD_REQUIREMENT.RECEIVED:
        case CLEAR_VALUES:
            return {
                ...state,
                requiredValues: {},
                optionalValues: {},
                sent: false,
                received: false,
                error: false,
                stepperIndex: 0
            };
        case POST_UPDATE_REQUIREMENT.SENT:
        case POST_ADD_REQUIREMENT.SENT:
            return {
                ...state,
                sent: true,
                error: false,
                received: false
            };
        case POST_UPDATE_REQUIREMENT.ERROR:
        case POST_ADD_REQUIREMENT.ERROR:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default requirementFormReducer;
