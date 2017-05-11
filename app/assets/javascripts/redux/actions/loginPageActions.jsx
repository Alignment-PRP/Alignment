import { LOGIN_PAGE_CHANGE_COMPONENT } from '../types';

export function registerOpen(boolean) {
    return {
        type: LOGIN_PAGE_CHANGE_COMPONENT,
        register: boolean
    }
}
