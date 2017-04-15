import {CHANGE_SIDE_MENU_MODE} from './../types';

const sideMenuReducer = (state = {
    mode: "MENU",
}, action) => {
    switch (action.type) {
        case CHANGE_SIDE_MENU_MODE:
            state = {
                mode: action.payload,
            };
            break;
    }
    return state;
};

export default sideMenuReducer;