
export const URL = "http://localhost:9000/";
export const API = URL + "api";

export const LOGIN_POST = API + "/login";
export const LOGOUT = API + "/logout";
export const SIGN_UP_POST = API + "/sign-up";

export const USER_GET = API + "/user";

export const PROJECT = API + "/project";
export const PROJECT_GET_ALL = PROJECT + "/all";
export const PROJECT_GET_ALL_USER = PROJECT_GET_ALL + "/user";
export const PROJECT_POST_NEW = PROJECT + "/new";
export const PROJECT_GET_BY_ID = PROJECT + "/";

export const PROJECT_REQUIREMENT = PROJECT + "/requirement";
export const PROJECT_REQUIREMENT_ALL = PROJECT_REQUIREMENT + "/all";
export const PROJECT_REQUIREMENT_GET_ALL_BY_ID = PROJECT_REQUIREMENT_ALL + "/";
export const PROJECT_REQUIREMENT_POST_NEW = PROJECT_REQUIREMENT + "/new";
export const PROJECT_REQUIREMENT_POST_ADD = PROJECT_REQUIREMENT + "/add";
export const PROJECT_REQUIREMENT_POST_UPDATE = PROJECT_REQUIREMENT + "/update";


export const REQUIREMENT = API + "/requirement";
export const REQUIREMENT_POST_ADD = REQUIREMENT + "/add";
export const REQUIREMENT_POST_UPDATE = REQUIREMENT + "/update";
export const REQUIREMENT_GET_ALL = REQUIREMENT + "/all";
export const REQUIREMENT_CATEGORY = REQUIREMENT + "/category";
export const REQUIREMENT_POST_CATEGORY_ADD = REQUIREMENT_CATEGORY + "/add";
export const REQUIREMENT_GET_CATEGORY_BY_ID = REQUIREMENT_CATEGORY + "/";
export const REQUIREMENT_GET_ALL_ADMIN = REQUIREMENT_GET_ALL + "/admin";

export const CATEGORY = API + "/catogory";
export const CATEGORY_POST_ADD = CATEGORY + "/add";
export const CATEGORY_GET_ALL = CATEGORY + "/all";
export const CATEGORY_GET_ALL_NAMES = CATEGORY_GET_ALL + "/names";
export const CATEGORY_BYNAME = CATEGORY + "/byname";
export const CATEGORY_GET_BY_NAME = CATEGORY_BYNAME + "/";

export const SUBCATEGORY = API + "/subcategory";
export const SUBCATEGORY_POST_ADD = SUBCATEGORY + "/add";