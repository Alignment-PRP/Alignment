import {GET_ALL_PROJECTS,
        GET_PROJECT_BY_ID,
        GET_REQUIREMENTS_BY_PROJECT_ID,
        POST_REQUIREMENT_TO_PROJECT,
        DELETE_REQUIREMENT_TO_PROJECT,
        POST_PROJECT_NEW,
} from './../types.jsx';
//Here is where the global state of the projectReducer actually get stored and changed. The projectReducer get passed actions.types into a switch function.
//When updating, all other fields in the state needs to stay the same. The field that gets updated gets the action.payload data from redux actions.
//Check project.jsx comment to see how to use the this project states and redux actions.
//all reducers get gathered into one big reducer in store.jsx

const projectReducer = (state = {
    projects: [],
    project: [],
    projectRequirements: []
}, action) => {
    switch (action.type) {
        case GET_ALL_PROJECTS:
            state = {
                projects: action.payload,
                project: state.project,
                projectRequirements: state.projectRequirements
            };
            break;
        case GET_PROJECT_BY_ID:
            state = {
                projects: state.projects,
                project: action.payload,
                projectRequirements: state.projectRequirements
            };
            break;
        case GET_REQUIREMENTS_BY_PROJECT_ID:
            state = {
                projectRequirements: action.payload,
                projects: state.projects,
                project: state.project
            };
            break;
        case POST_REQUIREMENT_TO_PROJECT:
        case DELETE_REQUIREMENT_TO_PROJECT:
        case POST_PROJECT_NEW:
            break;
    }
    return state;
};

export default projectReducer;