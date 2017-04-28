import { STEPPER_INDEX } from './../types';

export const changeStepperIndex = (index) => {
    return {
        type: STEPPER_INDEX,
        index: index
    }
};