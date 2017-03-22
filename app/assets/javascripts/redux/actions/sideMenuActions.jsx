import {CHANGE_SIDE_MENU_MODE} from './../types.jsx';

export function changeSideMenuMode(mode) {
    return {
        type: CHANGE_SIDE_MENU_MODE,
        payload: mode
    }
}
