import * as roles from './roles';

export const ADMIN_PAGE = [...roles.ADMIN];


export const NEW_PROJECT = [...roles.ADMIN, ...roles.BOBS];
export const EDIT_PROJECT = [];
export const DELETE_PROJECT = [];

export const NEW_REQUIREMENT = [];
export const EDIT_REQUIREMENT = [];
export const DELETE_REQUIREMENT = [];



export const TEST = [];