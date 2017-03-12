const requirementReducer = (state = {
    requirements: [],
    projectRequirements: []
}, action) => {
    switch (action.type) {
        case "GET_ALL_REQUIREMENTS":
            state = {
                requirements: action.payload,
                projectRequirements: state.requirements
            };
            break;
        case "GET_REQUIREMENTS_BY_PROJECT_ID":
            state = {
                requirements: state.requirements,
                projectRequirements: action.payload
            };
            break;
    }
    return state;
};

export default requirementReducer;