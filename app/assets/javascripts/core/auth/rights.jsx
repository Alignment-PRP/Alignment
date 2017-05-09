import * as roles from './roles';

export const actions = [
    'ADMIN_PAGE',
    'NEW_REQUIREMENT',
    'UPDATE_REQUIREMENT',
    'DELETE_REQUIREMENT'
];

export const ADMIN_PAGE = [...roles.ADMIN];
