const projectReducer = (state = {
    projects: [],
    project: []
}, action) => {
    switch (action.type) {
        case "GET_ALL_PROJECTS":
            state = {
                projects: action.payload,
                project: state.project
            };
            break;
        case "GET_PROJECT_BY_ID":
            state = {
                projects: state.projects,
                project: action.payload
            };
            break;
    }
    return state;
};

export default projectReducer;