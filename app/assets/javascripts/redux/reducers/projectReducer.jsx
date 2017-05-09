import {
    POST_NEW_PROJECT,
    GET_PROJECTS_PUBLIC,
    GET_PROJECTS_ACCESSIBLE,
    GET_PROJECTS_IS_MANAGER,
    GET_PROJECTS_IS_CREATOR,
    GET_PROJECT_DATA_BY_ID,
    GET_PROJECT_META_BY_ID,
    GET_PROJECT_BY_ID,
    GET_REQUIREMENTS_BY_PROJECT_ID,
    CHANGE_PROJECTS_TABLE_MODE,
    POST_DELETE_PROJECT,
    INIT_EDIT_PROJECT_FORM,
    CLEAR_INIT_EDIT_PROJECT_FORM,
    GET_USERS_THAT_HAVE_ACCESS,
    GET_CLASSES_THAT_HAVE_ACCESS,
    REMOVE_HAS_ACCESS,
    INSERT_HAS_ACCESS

} from './../types';
//Here is where the global state of the projectReducer actually get stored and changed. The projectReducer get passed actions.types into a switch function.
//When updating, all other fields in the state needs to stay the same. The field that gets updated gets the action.payload data from redux actions.
//Check project.jsx comment to see how to use the this project states and redux actions.
//all reducers get gathered into one big reducer in store.jsx

const projectReducer = (state = {
    projectData: null,
    projectMeta: null,
    initEditProjectForm: null,
    projectsPublic: null,
    projectsAccessible: null,
    projectsIsCreator: null,
    projectsIsManager: null,
    tableMode: "PUBLIC",
    project: [],
    projectRequirements: null,
    classesData: [],
    usersData: null
}, action) => {
    switch (action.type) {
        case POST_NEW_PROJECT.RECEIVED:
            const project = action.response.data;
            if (project.isPublic === '1') {
                return {
                    ...state,
                    projectsPublic: {
                        ...state.projectsPublic,
                        [project.ID]: project
                    },
                    projectsIsCreator: {
                        ...state.projectsIsCreator,
                        [project.ID]: project
                    }
                }
            }
            return {
                ...state,
                projectsIsCreator: {
                    ...state.projectsIsCreator,
                    [project.ID]: project
                }

            };
        case GET_PROJECTS_PUBLIC.RECEIVED:
            return {
                ...state,
                projectsPublic: action.response.data
            };
        case GET_PROJECTS_ACCESSIBLE.RECEIVED:
            return {
                ...state,
                projectsAccessible: action.response.data
            };
        case GET_PROJECTS_IS_CREATOR.RECEIVED:
            return {
                ...state,
                projectsIsCreator: action.response.data
            };
        case GET_PROJECTS_IS_MANAGER.RECEIVED:
            return {
                ...state,
                projectsIsManager: action.response.data
            };

        case GET_USERS_THAT_HAVE_ACCESS.RECEIVED:
            return {
                ...state,
                usersData: action.response.data
            };

        case GET_CLASSES_THAT_HAVE_ACCESS.RECEIVED:
            return {
                ...state,
                classesData: action.response.data
            };
        case GET_PROJECT_DATA_BY_ID.RECEIVED:
            return {
                ...state,
                projectData: action.response.data
            };
        case GET_PROJECT_META_BY_ID.RECEIVED:
            return {
                ...state,
                projectMeta: action.response.data
            };
        case GET_PROJECT_BY_ID.RECEIVED:
            return {
                ...state,
                project: action.response.data
            };
        case GET_REQUIREMENTS_BY_PROJECT_ID.RECEIVED:
            return {
                ...state,
                projectRequirements: action.response.data
            };
        case CHANGE_PROJECTS_TABLE_MODE:
            return {
                ...state,
                tableMode: action.payload
            };
        case INIT_EDIT_PROJECT_FORM:
            return {
                ...state,
                initEditProjectForm: action.payload
            };
        case CLEAR_INIT_EDIT_PROJECT_FORM:
            return {
                ...state,
                initEditProjectForm: action.payload
            };
        case POST_DELETE_PROJECT:
        default:
            return state;
    }
};

export default projectReducer;