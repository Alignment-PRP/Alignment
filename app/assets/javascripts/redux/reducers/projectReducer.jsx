import {GET_PUBLIC_PROJECTS,
        GET_PRIVATE_PROJECTS,
        GET_ARCHIVED_PROJECTS,
        GET_PROJECT_DATA_BY_ID,
        GET_PROJECT_META_BY_ID,
        GET_REQUIREMENTS_BY_PROJECT_ID,
        POST_REQUIREMENT_TO_PROJECT,
        DELETE_REQUIREMENT_TO_PROJECT,
        DELETE_PROJECT,
        POST_PROJECT_NEW,
        CHANGE_PROJECTS_TABLE_MODE
} from './../types';
//Here is where the global state of the projectReducer actually get stored and changed. The projectReducer get passed actions.types into a switch function.
//When updating, all other fields in the state needs to stay the same. The field that gets updated gets the action.payload data from redux actions.
//Check project.jsx comment to see how to use the this project states and redux actions.
//all reducers get gathered into one big reducer in store.jsx

const projectReducer = (state = {
    publicProjects: [],
    privateProjects: [],
    archivedProjects: [],
    tableMode: "PUBLIC",
    project: [],
    projectRequirements: null
}, action) => {
    switch (action.type) {
        case GET_PUBLIC_PROJECTS:
            return {
                ...state,
                publicProjects: action.payload
            };
        case GET_PRIVATE_PROJECTS:
            return {
                ...state,
                privateProjects: action.payload
            };
        case GET_ARCHIVED_PROJECTS:
            return {
                ...state,
                archivedProjects: action.payload
            };
        case GET_PROJECT_DATA_BY_ID:
            return {
                ...state,
                projectData: action.payload
            };
        case GET_PROJECT_META_BY_ID:
            return {
                ...state,
                projectMeta: action.payload
            };
        case GET_REQUIREMENTS_BY_PROJECT_ID:
            return {
                ...state,
                projectRequirements: action.payload
            };
        case CHANGE_PROJECTS_TABLE_MODE:
            return {
                ...state,
                tableMode: action.payload
            };
        case POST_REQUIREMENT_TO_PROJECT:
        case DELETE_REQUIREMENT_TO_PROJECT:
        case DELETE_PROJECT:
        case POST_PROJECT_NEW:
            break;
    }
    return state;
};

export default projectReducer;