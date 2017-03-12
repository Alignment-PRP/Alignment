const requirementReducer = (state = {
    requirements: []
}, action) => {
    switch (action.type) {
        case "GET_ALL_REQUIREMENTS":
            state = {
                requirements: action.payload
            };
            break;
    }
    return state;
};

export default requirementReducer;