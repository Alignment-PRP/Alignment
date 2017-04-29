import { STEPPER_INDEX, UPDATE_REQUIRED_VALUES, UPDATE_OPTIONAL_VALUES, CLEAR_VALUES } from './../types';

export function changeStepperIndex(index) {
    return {
        type: STEPPER_INDEX,
        index: index
    }
}

export function updateRequiredValues(values) {
    return {
        type: UPDATE_REQUIRED_VALUES,
        requiredValues: values
    }
}

export function updateOptionalValues(values) {
    return {
        type: UPDATE_OPTIONAL_VALUES,
        optionalValues: values
    }
}

export function clearValues() {
    return {
        type: CLEAR_VALUES
    }
}
