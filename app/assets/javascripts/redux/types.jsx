/**
 * Contains action types for redux.
 * @module redux/types
 */

import { type } from './utility';


//Project
export const GET_PROJECT_DATA_BY_ID = type('PROJECT_GET_DATA_BY_ID');
export const GET_PROJECT_META_BY_ID = type('PROJECT_GET_META_BY_ID');

export const GET_PROJECTS_PUBLIC = type('GET_PROJECTS_PUBLIC');
export const GET_PROJECTS_ACCESSIBLE = type('GET_PROJECTS_ACCESSIBLE');
export const GET_PROJECTS_IS_CREATOR = type('GET_PROJECTS_IS_CREATOR');
export const GET_PROJECTS_IS_MANAGER = type('GET_PROJECTS_IS_MANAGER');

export const GET_PROJECT_BY_ID = type('GET_PROJECT_BY_ID');
export const GET_REQUIREMENTS_BY_PROJECT_ID = type('GET_REQUIREMENTS_BY_PROJECT_ID');

export const POST_REQUIREMENT_TO_PROJECT = type('POST_REQUIREMENT_TO_PROJECT');
export const DELETE_REQUIREMENT_TO_PROJECT = type('DELETE_REQUIREMENT_TO_PROJECT');

export const POST_NEW_PROJECT = type('POST_NEW_PROJECT');
export const POST_UPDATE_PROJECT = type('POST_UPDATE_PROJECT');
export const POST_DELETE_PROJECT = type('POST_DELETE_PROJECT');

export const CHANGE_PROJECTS_TABLE_MODE = 'CHANGE_PROJECTS_TABLE_MODE';

//Projectform
export const CHANGE_PROJECT_FORM_MODE = 'CHANGE_PROJECT_FORM_MODE';
export const PROJECT_CLICKED = 'PROJECT_CLICKED';
export const FILL_PROJECT_FORM = 'FILL_PROJECT_FORM';
export const INIT_EDIT_PROJECT_FORM = 'INIT_EDIT_PROJECT_FORM';

//Table actions
export const TABLE_PAGE = 'TABLE_PAGE';
export const TABLE_ROWS = 'TABLE_ROWS';
export const TABLE_SEARCH_DATA = 'TABLE_SEARCH_DATA';
export const TABLE_SEARCH_VALUE = 'TABLE_SEARCH_VALUE';

//Dialog actions
export const DIALOG_OPEN = 'DIALOG_OPEN';
export const DIALOG_CHANGE_ACTION = 'DIALOG_CHANGE_ACTION';

//Requirement
export const FORM_UPDATE_REQUIREMENT = 'FORM_UPDATE_REQUIREMENT';
export const FORM_UPDATE_REQUIREMENT_METADATA = 'FORM_UPDATE_REQUIREMENT_METADATA';
export const GET_CATEGORY_NAMES = type('GET_CATEGORY_NAMES');
export const GET_REQUIREMENTS = type('GET_REQUIREMENTS');
export const POST_ADD_REQUIREMENT = type('POST_ADD_REQUIREMENT');
export const POST_UPDATE_REQUIREMENT = type('POST_UPDATE_REQUIREMENT');
export const POST_DELETE_REQUIREMENT = type('POST_DELETE_REQUIREMENT');
export const POST_UPDATE_PROJECT_REQUIREMENT = type('POST_UPDATE_REQUIREMENT');
export const POST_UPDATE_PROJECT_REQUIREMENT_METADATA = type('POST_UPDATE_REQUIREMENT_METADATA');

//Filter
export const UPDATE_FILTER_REQUIREMENT_LIST = 'UPDATE_FILTER_REQUIREMENT_LIST';
export const ADD_TO_FILTER = 'ADD_TO_FILTER';
export const REMOVE_FROM_FILTER = 'REMOVE_FROM_FILTER';
export const ADD_TO_SUB_FILTER = 'ADD_TO_SUB_FILTER';
export const REMOVE_FROM_SUB_FILTER = 'REMOVE_FROM_SUB_FILTER';

//Snackbar
export const SNACKBAR = 'SNACKBAR';

//User
export const GET_USER_DATA = type('GET_USER_DATA');
export const GET_USERS = type('GET_USERS');
export const GET_USERS_WITH_CLASS = type('GET_USERS_WITH_CLASS');
export const GET_USERCLASSES = type('GET_USERCLASSES');

//UserForm
export const FILL_FORM = 'FILL_FORM';
export const POST_USER_NEW = 'POST_USER_NEW';
export const POST_USER_UPDATE = 'POST_USER_UPDATE';
export const POST_USER_DELETE = 'POST_USER_DELETE';

//Classform
export const FILL_CLASS_FORM = "FILL_CLASS_FORM";
export const POST_CLASS_NEW = "POST_CLASS_NEW";
export const POST_CLASS_UPDATE = "POST_CLASS_UPDATE";
export const POST_CLASS_DELETE = "POST_CLASS_DELETE";

//Statistics
export const GET_PROJECTS_PER_REQUIREMENT = 'GET_PROJECTS_PER_REQUIREMENT';

//Popover
export const POPOVER_ANCHOR = 'POPOVER_ANCHOR';
export const POPOVER_CONTENT = 'POPOVER_CONTENT';
export const POPOVER_OPEN = 'POPOVER_OPEN';
export const POPOVER_ADD = 'POPOVER_ADD';

//RequirementForm
export const STEPPER_INDEX = 'STEPPER_INDEX';
export const UPDATE_REQUIRED_VALUES = 'UPDATE_REQUIRED_VALUES';
export const UPDATE_OPTIONAL_VALUES = 'UPDATE_OPTIONAL_VALUES';
export const CLEAR_VALUES = 'CLEAR_VALUES';

//Auth
export const LOGGED_IN = 'LOGGED_IN';
export const POST_REGISTER = type('POST_REGISTER');
export const POST_LOGIN = type('POST_LOGIN');
export const GET_LOGOUT = type('GET_LOGOUT');
export const GET_LOGIN_CHECK = type('GET_LOGIN_CHECK');
export const AUTH_CLEAR = 'AUTH_CLEAR';
export const LOGIN_CLEAR = 'LOGIN_CLEAR';
export const REGISTER_CLEAR = 'REGISTER_CLEAR';

//Login Page
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_PAGE_CHANGE_COMPONENT = 'LOGIN_PAGE_CHANGE_COMPONENT';

//Structure
export const STRUCTURE_GET_ALL = type('STRUCTURE_GET_ALL');
export const STRUCTURE_GET_TYPES = type('STRUCTURE_GET_TYPES');
