import {
    GET_PROJECTS_PUBLIC,
    GET_PROJECTS_ACCESSIBLE,
    GET_PROJECTS_IS_CREATOR,
    GET_PROJECTS_IS_MANAGER,
    POST_NEW_PROJECT,
    POST_DELETE_PROJECT,
    GET_PROJECT_BY_ID,
    GET_REQUIREMENTS_BY_PROJECT_ID,
    POST_REQUIREMENT_TO_PROJECT,
    DELETE_REQUIREMENT_TO_PROJECT,
    CHANGE_PROJECTS_TABLE_MODE
} from './../types';
//Here is where the global state of the projectReducer actually get stored and changed. The projectReducer get passed actions.types into a switch function.
//When updating, all other fields in the state needs to stay the same. The field that gets updated gets the action.payload data from redux actions.
//Check project.jsx comment to see how to use the this project states and redux actions.
//all reducers get gathered into one big reducer in store.jsx

const projectReducer = (state = {
    projectsPublic: null,
    projectsAccessible: null,
    projectsIsCreator: null,
    projectsIsManager: null,
    tableMode: "PUBLIC",
    project: [],
    projectRequirements: null
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
        case GET_PROJECT_BY_ID:
            return {
                ...state,
                project: action.response.data
            };
        case GET_REQUIREMENTS_BY_PROJECT_ID:
            return {
                ...state,
                projectRequirements: action.response.data
            };
        case CHANGE_PROJECTS_TABLE_MODE:
            return {
                ...state,
                tableMode: action.payload
            };
        default:
            return state;
    }
};

export default projectReducer;