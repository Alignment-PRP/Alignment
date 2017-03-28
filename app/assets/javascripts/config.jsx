
export const URL = "http://localhost:9000/";
export const API = URL + "api";

export const LOGIN_POST = API + "/login";
export const LOGOUT = API + "/logout";
export const SIGN_UP_POST = API + "/sign-up";

export const USER_GET = API + "/user";
export const USER_POST_UPDATE = USER_GET + "/update";
export const USER_POST_NEW = USER_GET + "/new";
export const USER_POST_UPDATE_RAW = (USER_GET + "/update").replace(URL, "/");
export const USER_POST_NEW_RAW = (USER_GET + "/new").replace(URL, "/");
export const USERS_GET = USER_GET + "s";
export const USERS_GET_WITH_CLASS = USERS_GET + "_c";
export const USER_GET_BY_ID = USERS_GET + "/";
export const USER_GET_BY_ID_MIN = USER_GET_BY_ID.replace(URL, "");
export const USER_GET_USERCLASSES = USER_GET + "/userClasses";

export const USERCLASS = API + "/userclass";
export const USERCLASS_POST_NEW = USERCLASS + "/new";
export const USERCLASS_POST_UPDATE = USERCLASS + "/update";
export const USERCLASS_POST_DELETE = USERCLASS + "/delete";

export const PROJECT = API + "/project";
export const PROJECT_POST_NEW = PROJECT + "/new";
export const PROJECT_GET_BY_ID = PROJECT + "/";

export const PROJECTS = API + "/projects";
export const PROJECTS_GET = PROJECTS;
export const PROJECTS_GET_USER = PROJECTS_GET + "/user";

export const PROJECT_REQUIREMENT = PROJECT + "/requirement";
export const PROJECT_REQUIREMENT_POST_NEW = PROJECT_REQUIREMENT + "/new";
export const PROJECT_REQUIREMENT_POST_ADD = PROJECT_REQUIREMENT + "/add";
export const PROJECT_REQUIREMENT_POST_UPDATE = PROJECT_REQUIREMENT + "/update";

export const PROJECT_REQUIREMENTS = PROJECT_REQUIREMENT + "s";
export const PROJECT_REQUIREMENTS_GET_BY_ID = PROJECT_REQUIREMENTS + "/";

export const REQUIREMENT = API + "/requirement";
export const REQUIREMENT_POST_ADD = REQUIREMENT + "/add";
export const REQUIREMENT_POST_UPDATE = REQUIREMENT + "/update";
export const REQUIREMENT_CATEGORY = REQUIREMENT + "/category";
export const REQUIREMENT_POST_CATEGORY_ADD = REQUIREMENT_CATEGORY + "/add";
export const REQUIREMENT_GET_CATEGORY_BY_ID = REQUIREMENT_CATEGORY + "/";

export const REQUIREMENTS_GET = REQUIREMENT + "s";
export const REQUIREMENTS_GET_ADMIN = REQUIREMENTS_GET + "/admin";

export const CATEGORY = API + "/category";
export const CATEGORY_POST_ADD = CATEGORY + "/add";
export const CATEGORY_GET_ALL = CATEGORY + "/all";
export const CATEGORY_GET_ALL_NAMES = CATEGORY_GET_ALL + "/names";
export const CATEGORY_BYNAME = CATEGORY + "/byname";
export const CATEGORY_GET_BY_NAME = CATEGORY_BYNAME + "/";

export const SUBCATEGORY = API + "/subcategory";
export const SUBCATEGORY_POST_ADD = SUBCATEGORY + "/add";