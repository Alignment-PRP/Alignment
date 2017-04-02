import {CHANGE_SIDE_MENU_MODE} from './../types.jsx';

/**
 * Contains action creators for {@link SideMenu}
 * @module redux/actions/sideMenu
 */

export function changeSideMenuMode(mode) {
    return {
        type: CHANGE_SIDE_MENU_MODE,
        payload: mode
    }
}
