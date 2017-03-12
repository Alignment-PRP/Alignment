const projectReducer = (state = {
    projects: []
}, action) => {
    switch (action.type) {
        case "GET_ALL_PROJECTS":
            state = {
                projects: action.payload
            };
            break;
    }
    return state;
};

export default projectReducer;