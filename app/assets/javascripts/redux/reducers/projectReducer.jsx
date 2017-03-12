const projectReducer = (state = {
    projects: [],
    project: [],
    projectRequirements: []
}, action) => {
    switch (action.type) {
        case "GET_ALL_PROJECTS":
            state = {
                projects: action.payload,
                project: state.project,
                projectRequirements: state.projectRequirements
            };
            break;
        case "GET_PROJECT_BY_ID":
            state = {
                projects: state.projects,
                project: action.payload,
                projectRequirements: state.projectRequirements
            };
            break;
        case "GET_REQUIREMENTS_BY_PROJECT_ID":
            state = {
                projectRequirements: action.payload,
                projects: state.projects,
                project: state.project
            };
            break;
    }
    return state;
};

export default projectReducer;