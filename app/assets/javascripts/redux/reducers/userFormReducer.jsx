import { FILL_FORM } from './../types';

const userFormReducer = (state = {
    user: null
}, action) => {
    switch (action.type) {
        case FILL_FORM:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};

export default userFormReducer;